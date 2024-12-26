"use client"

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from 'js-cookie';
import { AuthUser } from "@/lib/interface";
import axios from "axios";
import { BaseURL } from "../api/api";
import { useRouter } from "next/navigation";

export const useUser = () => {
    const { user, setUser, updateUser } = useContext(AuthContext);
    const router = useRouter()

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


    const deleteAccount = async (id: string | undefined, token: string | undefined) => {
        try {
            const response = await axios.delete(`${BaseURL}auth/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                router.push("/")
            }

            setUser(null)

            Cookies.remove("user")
            Cookies.remove("token")
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                return { success: false, message: err.response.data.message || 'Failed to delete account' };
            } else {
                return { success: false, message: 'An unexpected error occurred' };
            }
        }
    }

    return { user, addUser, removeUser, updateUser, deleteAccount };
};