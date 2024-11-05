"use client"
import { createContext, ReactNode } from 'react'
import Cookies from 'js-cookie';

interface clientCookiesContextType {
    getCookie: (name: string) => string | undefined;
    setCookie: (name: string, value: string, options?: Cookies.CookieAttributes) => void;
    removeCookie: (name: string) => void;
}

const clientCookieContext = createContext<clientCookiesContextType | undefined>(undefined);

interface Props {
    children: ReactNode
}

export const CLientCookiesProvider: React.FC<Props> = ({ children }) => {
    const getCookie = (name: string) => {
        return Cookies.get(name)
    }

    const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes) => {
        Cookies.set(name, value, options);
    }

    const removeCookie = (name: string) => {
        Cookies.remove(name)
    }

    return (
        <clientCookieContext.Provider value={{ getCookie, setCookie, removeCookie }}>
            {children}
        </clientCookieContext.Provider>
    )
}