"use client"

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthUser, Props } from "@/lib/interface";

interface TAuthContext {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    updateUser: (userData: Partial<AuthUser['user']>) => void;
}

export const AuthContext = createContext<TAuthContext>({
    user: null,
    setUser: () => { },
    updateUser: () => { }
});

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<AuthUser | null>(null);

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
    }, []);

    const updateUser = (userData: Partial<AuthUser['user']>) => {
        if (user) {
            const updatedUser = {
                ...user,
                user: {
                    ...user.user,
                    ...userData
                }
            };

            setUser(updatedUser);
            Cookies.set("user", JSON.stringify(updatedUser), {
                expires: 7,
                secure: true
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}