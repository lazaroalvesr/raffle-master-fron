"use client"

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from 'js-cookie';
import { AuthUser } from "@/lib/interface";

export const useUser = () => {
    const { user, setUser, updateUser } = useContext(AuthContext);

    const addUser = (user: AuthUser) => {
        setUser(user);
        Cookies.set("user", JSON.stringify(user), {
            expires: 7,
            secure: true
        });
    };

    const removeUser = () => {
        setUser(null);
        Cookies.remove("user");
    };

    return { user, addUser, removeUser, updateUser };
};