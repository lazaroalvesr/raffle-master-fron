"use client";

import { useUser } from "@/app/hooks/useUsers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { UserRaffleProps } from "@/lib/interface";
import { Table } from "@/app/_components/util/table";
import { useRouter } from "next/navigation";

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
                console.log("User ID is not available.");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await fetch(
                    `https://raffle-master-back.vercel.app/payment/getById/${user.user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const result = await response.json();
                setData(result);
            } catch (e) {
                console.error("Error fetching data:", e);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, user?.user.id, token, router]);


    return (
        <section className="flex flex-col w-full pt-[60px] lg:pt-[18px] md:w-full lg:w-full m-auto md:justify-start md:items-start justify-center items-center">
            <div className="flex w-full pl-8 lg:pl-6 border-b md:pl-8 mb-6 border-gray-200 lg:w-full ">
                <h1 className="text-[28px]  font-medium text-start">Meus Bilhetes</h1>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="ml-4 text-lg">Loading...</p>
                </div>
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="lg:pl-4  w-full lg:w-fit">
                    <Table
                        tickets={data.map((item: UserRaffleProps) => ({
                            nameRafle: item.raffle.name,
                            infosName: item.raffle.name,
                            infoPayment: item.status,
                            infoDateBuy: item.createdAt,
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
