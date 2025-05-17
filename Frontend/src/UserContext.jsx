import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState(() => {
        const stored = localStorage.getItem("user")
        return stored ? JSON.parse(stored) : null
    })

    const setUser = (user) => {
        setUserState(user)
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }

    useEffect(() => {
        if (!user) {
            fetch("/api/user", {
                credentials: "include",
            })
                .then(res => {
                    if (!res.ok) throw new Error("Not logged in")
                    return res.json()
                })
                .then(data => setUser({ username: data.username }))
                .catch(() => setUser(null))
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
