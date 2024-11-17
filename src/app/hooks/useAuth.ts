import { LoginProps, RegisterProps, Role } from "@/lib/interface";
import { useUser } from "./useUsers";
import axios from 'axios';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const API_URL = "http://localhost:3001/"
    const { user, addUser, removeUser } = useUser();
    const router = useRouter();

    const refresh = () => {
        const existingUser = Cookies.get("user");
        if (existingUser) {
            try {
                const userData = JSON.parse(existingUser);
                console.log("Usuário existente encontrado:", userData);
                addUser(userData);
            } catch (e) {
                console.error("Falha ao analisar usuário dos cookies:", e);
            }
        } else {
            console.log("Nenhum usuário encontrado nos cookies.");
        }
    };

    const register = async (creds: RegisterProps) => {
        try {
            const response = await axios.post(`${API_URL}auth/create`, creds);
            if (response.data) {
                addUser(response.data);
            }
            return { success: true, data: response.data };
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                return { success: false, message: err.response.data.message || 'Failed to register' };
            } else {
                return { success: false, message: 'An unexpected error occurred' };
            }
        }
    };

    const login = async (creds: LoginProps) => {
        try {
            const response = await axios.post(`${API_URL}auth/login`, creds);
            if (response.data) {
                addUser(response.data);
                Cookies.set("token", response.data.access_token, {
                    secure: true,
                    expires: 7
                });
            }
            if (response.data.user.role === Role.USER) {
                setTimeout(() => {
                    router.push("/dashboard/meusbilhetes");
                }, 2000)
            } else if (response.data.user.role === Role.ADM) {
                setTimeout(() => {
                    router.push("/dashboard/gerenciar-rifas");
                }, 2000)
            }
            return { success: true, data: response.data };
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                return { success: false, message: err.response.data.message || 'Failed to log in' };
            } else {
                return { success: false, message: 'An unexpected error occurred' };
            }
        }
    };

    const logout = () => {
        removeUser();
        Cookies.remove("token")
        router.push("/auth/login");
    };

    return { user, login, register, logout, refresh };
};
