/* eslint-disable */

"use client";

import { useUser } from "@/app/hooks/useUsers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { DrawWinnerTicketResponse, RaffleUniqueADM, RaffleUniqueEdit, WinnerInfosProps } from "@/lib/interface";
import { TableRifasAdm } from "@/app/_components/util/tableRifasAdm";
import axios from "axios";
import { BaseURL } from "@/app/api/api";
import { Loading } from "@/app/_components/util/loading";
import { ErrorDrawWinnerDialog } from "@/app/_components/util/errorDrawWinnereDialog";
import InfoDrawWinner from "@/app/_components/util/infoDrawWinner";
import InfoWinner from "@/app/_components/util/infoWinner";
import { Ticket } from "lucide-react";

export default function GerenciarRifas() {
    const { user } = useUser();
    const token = Cookies.get("token");
    const [data, setData] = useState<RaffleUniqueADM[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [drawWinner, setDrawWinner] = useState<DrawWinnerTicketResponse | null>()
    const [winner, setWinner] = useState<WinnerInfosProps | null>(null)
    const [erroDrawWinnere, setErrorDrawWinner] = useState<string | null>(null);
    const [errorWinner, setErrorWinner] = useState<String | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.user?.id) {
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`${BaseURL}raffle/getRaffleByUserId/${user.user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setData(response.data);
            } catch (e) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.user?.id, token]);

    const handleDelete = async (raffleId: string) => {
        try {
            await axios.delete(`${BaseURL}raffle/delete/${raffleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setData((prevData) => prevData.filter((raffle) => raffle.id !== raffleId));
        } catch (e) {
            console.error("Error deleting raffle:", e);
        }
    };

    const handleDrawWinner = async (raffleId: string) => {
        try {
            const response = await axios.post(
                `${BaseURL}raffle/winner/${raffleId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            )
            setDrawWinner(response.data)
        } catch (e) {
            setErrorDrawWinner("Nenhum bilhete comprado nessa rifa")
        }
    }

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

    const getWinnerInfos = async (raffleId: string) => {
        try {
            const response = await axios.get(`${BaseURL}raffle/getById/${raffleId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            console.log("response Ticket", response.data);
            setWinner(response.data);
        } catch (e) {
            setErrorWinner("Erro in get Winner" + e);
        }
    }


    return (
        <section className="flex flex-col w-full pt-[60px] lg:pt-[16px] md:w-full m-auto md:justify-start md:items-start justify-center items-center">
            <div className="flex w-full flex-col lg:flex-row md:flex-row lg:items-center justify-between pl-8 lg:pl-6 border-b pb-4 lg:pb-0 md:pb-0 md:pl-8 mb-6 border-gray-200">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Minhas Rifas</h1>
                <div className="flex items-center pr-6 gap-2">
                    <Ticket className="h-5 w-5" />
                    <span>{data.length} rifas cadastradas</span>
                </div>
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
                        drawWinner={handleDrawWinner}
                        winner={getWinnerInfos}
                    />
                </div>
            )}

            {winner && winner.raffle.winnerTicket?.user && (
                <div className="fixed px-4 z-50 lg:px-0 w-full left-0 top-0 m-auto h-screen flex items-center justify-center bg-gray-400/50">
                    <div className="animate-modalShow">
                        <InfoWinner
                            name={winner.raffle.winnerTicket.user.name}
                            email={winner.raffle.winnerTicket.user.email}
                            telephone={winner.raffle.winnerTicket.user.telephone}
                            number={winner.raffle.winnerTicket.number}
                            drawDate={winner.raffle.drawDate}
                            close={() => setWinner(null)}
                        />
                    </div>
                </div>
            )}

            {drawWinner && (
                <div className="w-full absolute top-0 h-full flex items-center m-auto justify-center bg-gray-200/40">
                    <div className="animate-modalShow">
                        <InfoDrawWinner
                            name={drawWinner.winner.user.name}
                            email={drawWinner.winner.user.email}
                            close={() => setDrawWinner(null)}
                            telephone={drawWinner.winner.user.telephone}
                            number={drawWinner.winner.ticket.number}
                        />
                    </div>
                </div>
            )}

            {erroDrawWinnere && (
                <ErrorDrawWinnerDialog
                    erroDrawWinnere={erroDrawWinnere}
                    setErrorDrawWinner={setErrorDrawWinner}
                />
            )}
        </section>
    );
}
