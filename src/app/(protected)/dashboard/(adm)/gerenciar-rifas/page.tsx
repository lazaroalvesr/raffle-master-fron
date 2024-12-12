/* eslint-disable */

"use client";

import { useUser } from "@/app/hooks/useUsers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { RaffleUniqueADM, RaffleUniqueEdit } from "@/lib/interface";
import { TableRifasAdm } from "@/app/_components/util/tableRifasAdm";
import axios from "axios";
import { BaseURL } from "@/app/api/api";
import { Loading } from "@/app/_components/util/loading";

export default function GerenciarRifas() {
    const { user } = useUser();
    const token = Cookies.get("token");
    const [data, setData] = useState<RaffleUniqueADM[]>([]);
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

                const response = await axios.get(`${BaseURL}raffle/getByUserId/${user.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (e) {
                console.error("Error fetching data:", e);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.user?.id, token]);

    console.log(data)

    const handleDelete = async (raffleId: string) => {
        try {
            await axios.delete(`${BaseURL}raffle/delete/${raffleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData((prevData) => prevData.filter((raffle) => raffle.id !== raffleId));
        } catch (e) {
            console.error("Error deleting raffle:", e);
        }
    };

    const handleEdit = async (raffleId: string, updatedRaffle: RaffleUniqueEdit) => {
        try {
            const formData = new FormData();

            if (updatedRaffle.name) {
                formData.append("name", updatedRaffle.name);
            }
            if (updatedRaffle.description) {
                formData.append("description", updatedRaffle.description);
            }
            if (updatedRaffle.endDate) {
                formData.append("endDate", new Date(updatedRaffle.endDate).toISOString());
            }
            if (updatedRaffle.quantityNumbers) {
                formData.append("quantityNumbers", String(updatedRaffle.quantityNumbers));
            }
            if (updatedRaffle.ticketPrice) {
                formData.append("ticketPrice", updatedRaffle.ticketPrice);
            }
            if (updatedRaffle.image) {
                formData.append("image", updatedRaffle.image);
            }

            const response = await axios.patch(`${BaseURL}raffle/update/${raffleId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setData((prevData) =>
                prevData.map((raffle) =>
                    raffle.id === raffleId
                        ? { ...raffle, ...updatedRaffle, image: undefined }
                        : raffle
                )
            );
        } catch (e) {
            console.error("Error updating raffle:", e);
        }
        console.log("Editing raffle:", raffleId, updatedRaffle);
    };

    return (
        <section className="flex flex-col w-full pt-[60px] lg:pt-[16px] md:w-full m-auto md:justify-start md:items-start justify-center items-center">
            <div className="flex w-full pl-8 lg:pl-6 border-b md:pl-8 mb-6 border-gray-200">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Minhas Rifas</h1>
            </div>
            {loading ? (
                <Loading />
            ) : error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <div className="px-4 w-full">
                    <TableRifasAdm
                        raffles={data}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            )}
        </section>
    );
}
