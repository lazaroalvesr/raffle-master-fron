/* eslint-disable */
"use client"

import { BaseURL } from "@/app/api/api";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react"
import Cookies from "js-cookie";
import { TableUserAll } from "@/app/_components/util/tableUsersAll";
import { UserResponse } from "@/lib/interface";
import { Loading } from "@/app/_components/util/loading";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserAllPage() {
    const token = Cookies.get("token")
    const [user, setUsers] = useState<UserResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchUser, setSearchUser] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)

                const response = await axios.get(`${BaseURL}auth/usersAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        email: searchUser
                    }
                })
                setUsers(response.data)
                setError(null)
            } catch (err) {
                console.log("o", err)
                setError("Erro ao buscar os dados")
                setUsers(undefined)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [searchUser, token])

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value);
    }

    return (
        <section className="flex flex-col w-full pt-[60px] lg:pt-[16px] md:w-full m-auto md:justify-start md:items-start justify-center ">
            <div className="flex flex-col lg:w-fulljustify-between px-6 md:w-full md:pb-3 md:gap-3  lg:pl-6 md:pl-8  ">
                <div className="flex lg:items-center justify-between lg:flex-row flex-col md:flex-row">
                    <h1 className="text-3xl font-bold tracking-tight">Todos os Participantes</h1>
                    <div className="flex items-center gap-2 pt-2">
                        <Users className="h-5 w-5" />
                        <span>{user?.count} usuários cadastrados</span>
                    </div>
                </div>
                <div className="flex space-x-2 items-center py-2 lg:py-0 md:py-0 justify-center">
                    <Input
                        type="text"
                        placeholder="ex: jonDoe@gmail.com"
                        className="flex-grow"
                        value={searchUser}
                        onChange={handleSearchChange}
                    />
                    <Button className="w-4 h-8">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <span className=" border-gray-200 border-t w-full lg:-mt-1"></span>
            {loading ? (
                <div className="mt-12 flex items-center justify-center m-auto">
                    <Loading />
                </div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="w-full px-4 lg:px-4 pt-4">
                    {user && <TableUserAll users={user} />}
                </div>
            )}
        </section>
    )
}