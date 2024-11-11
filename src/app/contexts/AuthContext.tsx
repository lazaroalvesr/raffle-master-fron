"use client"

import { createContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { AuthUser, Props, TAuthContext } from "@/lib/interface"

export const AuthContext = createContext<TAuthContext>({
    user: null,
    setUser: () => { },
    updateUser: () => { }
})

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    useEffect(() => {
        if (!user) {
            const existingUser = Cookies.get("user")

            if (existingUser) {
                try {
                    const parsedUser = JSON.parse(existingUser)
                    setUser(parsedUser)
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error('Erro ao parsear usuário:', error.message)
                    }
                    Cookies.remove("user")
                }
            }
        }
    }, [user])

    const updateUser = (userData: Partial<AuthUser['user']>) => {
        if (user) {
            const updatedUser = {
                ...user,
                user: {
                    ...user.user,
                    ...userData
                }
            }

            console.log('Atualizando usuário:', updatedUser)
            setUser(updatedUser)
            Cookies.set("user", JSON.stringify(updatedUser), {
                expires: 7,
                secure: true
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}