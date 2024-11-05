"use client"

import { useContext } from "react";
import { AuthContext, AuthUser } from "../contexts/AuthContext";
import Cookies from 'js-cookie';

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);

    const addUser = (user: AuthUser) => {
        setUser(user);
        Cookies.set("user", JSON.stringify(user),{
            expires: 7,
            secure: true
        });
    };

    const removeUser = () => {
        setUser(null);
        Cookies.remove("user");
    };

    return { user, addUser, removeUser };
};
