"use client";

import { useUser } from "@/app/hooks/useUsers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { UserRaffleProps } from "@/lib/interface";
import { TableMeusBilhetesUser } from "@/app/_components/util/tableMeusBilhetesUser";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loading } from "@/app/_components/util/loading";

export default function MeusBilhetesPage() {
    const { user } = useUser();
    const token = Cookies.get("token");
    const router = useRouter();
    const [data, setData] = useState<UserRaffleProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.user?.id) {
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(
                    `https://tecnewsbr.com.br/payment/getById/${user.user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setData(response.data);
            } catch (e) {
                console.error("Error fetching data:", e);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (user?.user?.id) {
            fetchData();
        }
    }, [user, user?.user.id, token, router]);

    return (
        <section className="flex flex-col w-full pt-[60px] lg:pt-[16px] md:w-full lg:w-full m-auto md:justify-start md:items-start justify-center items-center">
            <div className="flex w-full pl-8 lg:pl-6 border-b md:pl-8 mb-6 border-gray-200 lg:w-full ">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Meus Números da Sorte</h1>
            </div>
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="w-full px-4">
                    <TableMeusBilhetesUser
                        tickets={data.map((item: UserRaffleProps) => ({
                            id: item.id,
                            nameRafle: item.raffle.name,
                            infosName: item.raffle.name,
                            infoPayment: item.status,
                            infoDateBuy: item.createdAt,
                            pixKey: item.pixKey,
                            infoAmout: item.amount,
                            ticketNumbers: item.ticketNumbers,
                            infoNamePayer: item.user.name,
                            pixLink: item.pixUrl,
                        }))}
                    />
                </div>
            )}
        </section>
    );
}
