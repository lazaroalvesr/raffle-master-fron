"use client"

import { BaseURL } from "@/app/api/api";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import Cookies from "js-cookie";
import { TableUserAll } from "@/app/_components/util/tableUsersAll";
import { UserAllProps } from "@/lib/interface";
import { Loading } from "@/app/_components/util/loading";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserAllPage() {
    const token = Cookies.get("token")
    const [user, setUsers] = useState<UserAllProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchUser, setSearchUser] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            if (!user) {
                console.log("User ID is not available.");
                return;
            }

            try {
                setLoading(true)
                setError(null)

                const response = await axios.get(`${BaseURL}auth/usersAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        name: searchUser
                    }
                })

                setUsers(response.data)
            } catch (err) {
                console.log("o")
                setError("Erro ao buscar os dados")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [searchUser])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value);
    }

    return (
        <section className="flex flex-col w-full pt-[60px] lg:pt-[16px] md:w-full m-auto md:justify-start md:items-start justify-center items-center">
            <div className="flex lg:flex-row flex-col w-full md:flex-row justify-between items-center lg:pl-6 border-b md:pl-8 mb-6 border-gray-200">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Todos os Participantes</h1>
                <div className="flex space-x-2 mr-5 mb-5 mt-2 items-center  justify-center">
                    <Input
                        type="text"
                        placeholder="Pesquisar..."
                        className="flex-grow"
                        value={searchUser}
                        onChange={handleSearchChange}
                    />
                    <Button className="w-4 h-8">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="w-full px-4 lg:px-4 ">
                    <TableUserAll users={user} />
                </div>
            )}
        </section>
    )
}