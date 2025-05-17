import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/api/user", {
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Not logged in")
                return res.json()
            })
            .then(data => setUser({ username: data.username }))
            .catch(() => setUser(null))
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
