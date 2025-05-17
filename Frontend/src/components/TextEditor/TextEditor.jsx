import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import QuillCursors from "quill-cursors"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import { Save, Users, Wifi, WifiOff, Share2, FileText, Download, History, ChevronLeft, X } from "lucide-react"
import "quill/dist/quill.snow.css"
import "./text-editor.css"

Quill.register("modules/cursors", QuillCursors)

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

const TEMPLATES = [
    { id: "blank", name: "Blank Document", content: "" },
    {
        id: "meeting",
        name: "Meeting Notes",
        content:
            "<h1>Meeting Notes</h1><p>Date: </p><h2>Attendees</h2><ul><li></li></ul><h2>Agenda</h2><ol><li></li></ol><h2>Action Items</h2><ul><li></li></ul>",
    },
    {
        id: "essay",
        name: "Essay",
        content: "<h1>Title</h1><h2>Introduction</h2><p></p><h2>Main Body</h2><p></p><h2>Conclusion</h2><p></p>",
    },
    {
        id: "report",
        name: "Report",
        content:
            "<h1>Report Title</h1><p><strong>Author:</strong></p><p><strong>Date:</strong></p><h2>Executive Summary</h2><p></p><h2>Introduction</h2><p></p><h2>Findings</h2><p></p><h2>Conclusion</h2><p></p><h2>Recommendations</h2><p></p>",
    },
]

export default function TextEditor() {
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()
    const [connected, setConnected] = useState(false)
    const [saving, setSaving] = useState(false)
    const [activeUsers, setActiveUsers] = useState([])
    const [documentTitle, setDocumentTitle] = useState("Untitled Document")
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [wordCount, setWordCount] = useState({ words: 0, characters: 0 })
    const [showTemplates, setShowTemplates] = useState(false)
    const [toast, setToast] = useState({ visible: false, message: "" })

    const username = "User-Anonymous"
    const [userColor, setUserColor] = useState(() => {
        const savedColor = localStorage.getItem("userColor")
        const generateUniqueColor = () => {
            return `hsl(${Math.floor(Math.random() * 360)},75%,60%)`
        }
        const newColor = savedColor || generateUniqueColor()
        localStorage.setItem("userColor", newColor)
        return newColor
    })
    const isColorInUse = (color, users) => {
        return users.some((user) => user.color === color)
    }
    const generateUniqueColor = (existingUsers) => {
        let color
        let attempts = 0
        const maxAttempts = 30 
        do {
            color = `hsl(${Math.floor(Math.random() * 360)},75%,60%)`
            attempts++
        } while (isColorInUse(color, existingUsers) && attempts < maxAttempts)

        return color
    }

    useEffect(() => {
        const s = io("http://localhost:3001")
        setSocket(s)

        s.on("connect", () => {
            setConnected(true)
            s.emit("check-color", { color: userColor })
        })

        s.on("color-validation", ({ isUnique, existingUsers }) => {
            if (!isUnique) {
                const newColor = generateUniqueColor(existingUsers)
                setUserColor(newColor)
                localStorage.setItem("userColor", newColor)
                s.emit("update-color", { color: newColor })
            }
        })

        s.on("disconnect", () => setConnected(false))

        return () => s.disconnect()
    }, [userColor])

    useEffect(() => {
        if (!socket || !quill) return

        socket.once("load-document", (doc) => {
            quill.setContents(doc)
            quill.enable()
        })

        socket.emit("get-document", documentId)
    }, [socket, quill, documentId])

    useEffect(() => {
        if (!socket || !quill) return

        const interval = setInterval(() => {
            setSaving(true)
            socket.emit("save-document", quill.getContents())
            setTimeout(() => setSaving(false), 1000)
        }, SAVE_INTERVAL_MS)

        return () => clearInterval(interval)
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill) return

        const handler = (delta) => quill.updateContents(delta)
        socket.on("receive-changes", handler)

        return () => socket.off("receive-changes", handler)
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill) return

        const handler = (delta, oldDelta, source) => {
            if (source === "user") socket.emit("send-changes", delta)
            updateWordCount(quill.getText())
        }

        quill.on("text-change", handler)
        return () => quill.off("text-change", handler)
    }, [socket, quill])

    useEffect(() => {
        if (!socket || !quill) return

        quill.on("selection-change", (range) => {
            if (!range) return
            socket.emit("cursor-position", {
                userId: socket.id,
                range,
                color: userColor,
                name: username,
            })
        })
    }, [socket, quill, userColor, username])

    useEffect(() => {
        if (!socket || !quill) return

        const cursors = quill.getModule("cursors")

        const handler = ({ userId, range, color, name }) => {
            if (userId === socket.id || !range) return

            setActiveUsers((prev) => {
                const existingUserIndex = prev.findIndex((user) => user.id === userId)

                if (existingUserIndex >= 0) {
                    const updatedUsers = [...prev]
                    updatedUsers[existingUserIndex] = {
                        ...updatedUsers[existingUserIndex],
                        color,
                    }
                    return updatedUsers
                } else {
                    return [...prev, { id: userId, name, color }]
                }
            })

            cursors.createCursor(userId, name, color)
            cursors.moveCursor(userId, range)
        }

        socket.on("cursor-update", handler)

        // Add handler for color updates from other users
        socket.on("user-color-update", ({ userId, color }) => {
            setActiveUsers((prev) => {
                return prev.map((user) => (user.id === userId ? { ...user, color } : user))
            })

            // Update cursor color if it exists
            if (cursors.cursors[userId]) {
                cursors.removeCursor(userId)
                const user = activeUsers.find((u) => u.id === userId)
                if (user) {
                    cursors.createCursor(userId, user.name, color)
                }
            }
        })

        // Clean up users when they disconnect
        socket.on("user-disconnected", (userId) => {
            setActiveUsers((prev) => prev.filter((user) => user.id !== userId))
        })

        return () => {
            socket.off("cursor-update", handler)
            socket.off("user-color-update")
            socket.off("user-disconnected")
        }
    }, [socket, quill, activeUsers])

    const wrapperRef = useCallback((wrapper) => {
        if (!wrapper) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)

        const q = new Quill(editor, {
            theme: "snow",
            modules: {
                toolbar: TOOLBAR_OPTIONS,
                cursors: true,
            },
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    }, [])

    const updateWordCount = (text) => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0
        const characters = text.length
        setWordCount({ words, characters })
    }

    const showToast = (message) => {
        setToast({ visible: true, message })

        // Hide toast after 3 seconds
        setTimeout(() => {
            setToast({ visible: false, message: "" })
        }, 3000)
    }

    const shareDocument = () => {
        navigator.clipboard.writeText(window.location.href)
        showToast("Document link copied to clipboard!")
    }

    const applyTemplate = (templateId) => {
        if (!quill) return

        const template = TEMPLATES.find((t) => t.id === templateId)
        if (template) {
            quill.clipboard.dangerouslyPasteHTML(template.content)
            setShowTemplates(false)
        }
    }

    const exportDocument = () => {
        if (!quill) return

        const content = quill.root.innerHTML
        const blob = new Blob(
            [
                `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${documentTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #2563eb; }
          h2 { color: #4b5563; }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `,
            ],
            { type: "text/html" },
        )

        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${documentTitle}.html`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="editor-container">
            {toast.visible && (
                <div className="toast">
                    <span>{toast.message}</span>
                    <button className="close-toast" onClick={() => setToast({ visible: false, message: "" })}>
                        <X size={16} />
                    </button>
                </div>
            )}

            <header className="editor-header">
                <div className="document-info">
                    <input
                        type="text"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        className="document-title"
                    />
                    <div className="document-id">ID: {documentId}</div>
                </div>

                <div className="editor-actions">
                    <div className="status-indicator">
                        {connected ? (
                            <div className="status connected">
                                <Wifi size={16} /> Connected
                            </div>
                        ) : (
                            <div className="status disconnected">
                                <WifiOff size={16} /> Disconnected
                            </div>
                        )}

                        {saving && (
                            <div className="status saving">
                                <Save size={16} /> Saving...
                            </div>
                        )}
                    </div>

                    <div className="action-buttons">
                        <button className="action-button" onClick={() => setShowTemplates(!showTemplates)} title="Templates">
                            <FileText size={16} />
                        </button>
                        <button className="action-button" onClick={exportDocument} title="Export document">
                            <Download size={16} />
                        </button>
                        <button className="action-button" onClick={shareDocument} title="Share document">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {showTemplates && (
                <div className="templates-panel">
                    <h3>Choose a Template</h3>
                    <div className="templates-list">
                        {TEMPLATES.map((template) => (
                            <div key={template.id} className="template-item" onClick={() => applyTemplate(template.id)}>
                                <FileText size={20} />
                                <span>{template.name}</span>
                            </div>
                        ))}
                    </div>
                    <button className="close-templates" onClick={() => setShowTemplates(false)}>
                        Cancel
                    </button>
                </div>
            )}

            <div className="editor-content">
                <div className={`active-users-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
                    <div className="sidebar-header">
                        <div className="sidebar-title">
                            <Users size={16} />
                            <span>Active Users</span>
                        </div>
                        <button
                            className="collapse-sidebar"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <ChevronLeft size={16} />
                        </button>
                    </div>
                    <div className="users-list">
                        <div className="user-item" style={{ "--user-color": userColor }}>
                            <div className="user-avatar" style={{ backgroundColor: userColor }}>
                                {username.charAt(0)}
                            </div>
                            <div className="user-name">{username} (You)</div>
                        </div>

                        {activeUsers.map((user) => (
                            <div key={user.id} className="user-item" style={{ "--user-color": user.color }}>
                                <div className="user-avatar" style={{ backgroundColor: user.color }}>
                                    {user.name.charAt(0)}
                                </div>
                                <div className="user-name">{user.name}</div>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar-footer">
                        <button className="sidebar-button">
                            <History size={16} />
                            <span>History</span>
                        </button>
                    </div>
                </div>

                <div className="quill-container" ref={wrapperRef}></div>
            </div>

            <footer className="editor-footer">
                <div className="word-count">
                    {wordCount.words} words | {wordCount.characters} characters
                </div>
            </footer>
        </div>
    )
}
