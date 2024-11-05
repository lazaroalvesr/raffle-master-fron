"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Role } from "@/lib/interface";

interface Raffles {
    name: string
}

interface Tickets {
    name: string
}

interface Payment {
    name: string
}


export type TUser = {
    id: string;
    name: string
    email: string;
    telephone: string
    role: Role
    access_token: string
    raffles: Raffles[]
    tickets: Tickets[]
    Payment: Payment[]
};

export type AuthUser = {
    token: string;
    user: TUser;
};

interface TAuthContext {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void
}

export const AuthContext = createContext<TAuthContext>({
    user: null,
    setUser: () => { }
})

interface Props {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    useEffect(() => {
        if (!user) {
            const existingUser = Cookies.get("user");

            if (existingUser) {
                try {
                    setUser(JSON.parse(existingUser));
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}