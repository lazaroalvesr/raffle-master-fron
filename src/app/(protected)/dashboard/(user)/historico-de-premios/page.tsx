/* eslint-disable */
"use client"

import { BaseURL } from "@/app/api/api"
import { useAuth } from "@/app/hooks/useAuth"
import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Ticket } from "@/lib/interface"
import { TableRaffleWon } from "@/app/_components/util/tableRaffleWon"
import { Loading } from "@/app/_components/util/loading"
import Image from "next/image"

export default function HistoricoDePremios() {
    const { user } = useAuth();
    const [raffleData, setRaffleData] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const token = Cookies.get('token');

    useEffect(() => {
        async function fetchDatePremios() {
            try {
                if (!user?.user.id) return;
                setLoading(true)
                setError(null)

                const response = await axios.get(
                    `${BaseURL}auth/raffle-tickets-won/${user.user.id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                const tickets = response.data[0]?.tickets || []
                setRaffleData(tickets);
            } catch (error) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false)
            }
        }

        fetchDatePremios();
    }, [user?.user.id, token]);

    return (
        <section className="flex flex-col w-full pt-[60px] lg:pt-[16px]">
            <div className="flex w-full md:flex-row lg:flex-row pb-4 md:pb-0 lg:pb-0 flex-col justify-between pl-0 lg:pl-6 border-b md:pl-8 mb-6 border-gray-200 lg:w-full">
                <div className="flex items-center gap-4 justify-center">
                    <Image
                        src="/img/icons/icon_festa.png"
                        alt="Icone de Festa"
                        width={30}
                        height={30}
                        className="lg:w-[30px] w-6"
                    />
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Histórico de Prêmios</h1>
                    <Image
                        src="/img/icons/icon_festa.png"
                        alt="Icone de Festa"
                        width={30}
                        height={30}
                        className="lg:w-[30px] w-6"
                    />
                </div>
            </div>
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="px-4 w-full">
                    {<TableRaffleWon tickets={raffleData} />}
                </div>
            )}
        </section>
    );
}