/* eslint-disable */
"use client";

import { RaffleUniqueProps } from "@/lib/interface";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { CardUniqueRaffleLoading } from "@/app/_components/home/cardRaffleUniqueLoading";
import { CardInfosRaffle } from "@/app/_components/util/cardInfosRaffle";
import Cookies from "js-cookie";
import { useUser } from "@/app/hooks/useUsers";
import PurchaseCard from "@/app/_components/util/purchaseCard";
import { BaseURL } from "@/app/api/api";
import { Minus, Plus, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MensagemError } from "@/app/_components/util/mensagemError";
import { MensagemSucess } from "@/app/_components/util/mensagemSucess";
import { IoMdClose } from "react-icons/io";
import { MensagemAviso } from "@/app/_components/util/mensagemAviso";
import RenderHTML from "@/app/_components/util/renderTiptapContent ";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation'

export default function RaffleUnique({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const token = Cookies.get("token");
    const { user } = useUser();
    const [raffles, setRaffles] = useState<RaffleUniqueProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const [buyTickets, setBuyTickets] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(0);
    const [qrCode, setQrCode] = useState<String>("")
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(1);
    const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
    const back = useRouter()

    const userId = user?.user?.id
    const email = user?.user?.email;
    const numbersAvailable = Number(raffles?.availableTickets);

    async function getRaffle() {
        try {
            setLoading(true);
            const response = await axios.get(`${BaseURL}raffle/getById/${id}`);
            setRaffles(response.data);
        } catch (error) {
            setErrorMessage("Error fetching raffle details. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function buyTicket(quantity: number) {
        if (!user) {
            setNoticeMessage("Você precisa estar logado para comprar numeros.");
            return;
        }

        setLoadingBuy(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await axios.post(
                `https://tecnewsbr.com.br/tickets/buy`,
                {
                    userId,
                    email,
                    raffleId: (await params).id,
                    quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            console.log(response.data)

            setBuyTickets(response.data);
            setQuantity(quantity);
            setQrCode(response.data.paymentDetails.qrCode);
            setSuccessMessage("Números comprados com sucesso!");
            setSuccessModalOpen(true);

        } catch (error: any) {
            console.error('Erro detalhado:', error);

            if (error.response) {
                console.error('Erro de Resposta:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);

                setErrorMessage(`Erro ao comprar número: ${error.response.data.message || 'Erro desconhecido'}`);
            } else if (error.request) {
                console.error('Erro de Requisição:', error.request);
                setErrorMessage("Sem resposta do servidor");
            } else {
                console.error('Erro de Configuração:', error.message);
                setErrorMessage("Erro na configuração da requisição");
            }
        } finally {
            setLoadingBuy(false);
        }
    }

    useEffect(() => {
        getRaffle();
    }, [id]);

    const handleSetCount = (value: number) => {
        setCount((prevCount) => {
            const newCount = prevCount + value;
            return Math.min(newCount, numbersAvailable);
        });
    };

    const handleDecrement = () => {
        if (count > 1) setCount(count - 1);
    };

    const handleIncrement = () => {
        if (count < Number(raffles?.availableTickets)) {
            setCount(count + 1);
        }
    };

    const toggleShow = () => {
        setShow(!show)
    }

    const closeSuccessModal = () => setSuccessModalOpen(false);
    const numbersSoldOut = Number(raffles?.availableTickets) === 0 || raffles?.raffle.winnerTicketId !== null;

    return (
        <section className="max-w-6xl flex justify-center items-center m-auto flex-col lg:pb-32 pb-12">
            {loading ? (
                <CardUniqueRaffleLoading />
            ) : (
                <div className="pt-12">
                    <button className="ml-4 mb-4 bg-gray-200 w-fit rounded-md" onClick={back.back}>
                        <IoIosArrowRoundBack size={44} color="black" />
                    </button>
                    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6 ">
                        <div className="space-y-6 lg:w-[500px] w-full">
                            <Card>
                                <CardHeader className="border-b bg-muted bg-[#50c878] rounded-t-md mb-8 text-gray-50">
                                    <CardTitle className="text-2xl font-bold">{raffles?.raffle.name}</CardTitle>
                                    <p className="text-sm text-gray-100">O melhor churrasco para você e seus amigos!</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-6">
                                        <Image
                                            onClick={toggleShow}
                                            src={raffles?.raffle.image || ""}
                                            alt="Imagem da Rifa"
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">O que você pode ganhar:</h3>
                                        <div>
                                            <RenderHTML content={raffles?.raffle.description} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6 lg:w-[500px]">
                            <CardInfosRaffle
                                quantityNumbers={raffles?.raffle.quantityNumbers}
                                ticketPrice={raffles?.raffle.ticketPrice}
                                endDate={raffles?.raffle.endDate}
                                winnerTicketId={raffles?.raffle.winnerTicketId}
                            />

                            <Card className="relative flex flex-col justify-center m-auto items-center">
                                <CardHeader className="border-b bg-muted w-full bg-[#50c878] rounded-t-md text-gray-50">
                                    <CardTitle className="text-xl">Quantidade</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 ">
                                    <p className="text-center text-sm text-muted-foreground mb-4">
                                        Participe sem estresse! O site faz a escolha dos números para você!
                                    </p>

                                    <div className="flex items-center gap-2 mb-6">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleDecrement}
                                            disabled={loadingBuy || numbersSoldOut}>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <div className="w-full text-center border rounded-md p-2">{count}</div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleIncrement}
                                            disabled={loadingBuy || numbersSoldOut || count >= Number(raffles?.availableTickets)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mb-6">
                                        <Button variant="outline" onClick={() => handleSetCount(1)} disabled={loadingBuy || numbersSoldOut || count >= Number(raffles?.availableTickets)} className="w-full">+1</Button>
                                        <Button variant="outline" onClick={() => handleSetCount(5)} disabled={loadingBuy || numbersSoldOut || count >= Number(raffles?.availableTickets)} className="w-full">+5</Button>
                                        <Button variant="outline" onClick={() => handleSetCount(10)} disabled={loadingBuy || numbersSoldOut || count >= Number(raffles?.availableTickets)} className="w-full">+10</Button>
                                        <Button variant="outline" onClick={() => handleSetCount(15)} disabled={loadingBuy || numbersSoldOut || count >= Number(raffles?.availableTickets)} className="w-full">+15</Button>
                                        <Button variant="outline" onClick={() => handleSetCount(20)} disabled={loadingBuy || numbersSoldOut || count >= Number(raffles?.availableTickets)} className="w-full">+20</Button>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg mb-6">
                                        <span className="font-semibold">Total:</span>
                                        <span className="text-xl font-bold">
                                            R$ {((Number(count) || 0) * (Number(raffles?.raffle?.ticketPrice) || 0)).toFixed(2)}
                                        </span>

                                    </div>
                                </CardContent>
                                <CardFooter className="w-full">
                                    <Button
                                        onClick={() => buyTicket(count)}
                                        className={`w-full relative overflow-hidden transition-all duration-300 ${loadingBuy
                                            ? 'bg-green-600 text-gray-50 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                                            }`}
                                        size="lg"
                                        disabled={loadingBuy || numbersAvailable === 0 || raffles?.raffle.winnerTicketId !== null}
                                    >
                                        <span className={`flex items-center justify-center transition-opacity duration-300 ${loadingBuy ? 'opacity-0' : 'opacity-100'}`}>
                                            <Ticket className="mr-2 h-5 w-5" />
                                            {numbersAvailable === 0
                                                ? "Numeros Esgotados"
                                                : `Comprar ${count} ${count === 1 ? 'número' : 'números'}`
                                            }

                                        </span>
                                        {loadingBuy && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="ml-2 ">Comprando...</span>
                                            </span>
                                        )}
                                    </Button>

                                </CardFooter>
                                <div className="absolute w-full bg-red-300 -bottom-14">
                                    {noticeMessage && <MensagemAviso text={noticeMessage || ""} />}
                                    {errorMessage && <MensagemError text={errorMessage || ""} />}
                                    {successMessage && <MensagemSucess text={successMessage || ""} />}
                                </div>
                            </Card>
                        </div>
                        {successModalOpen && (
                            <div className="fixed inset-0 w-full px-3 flex items-center justify-center z-50 bg-black bg-opacity-70">
                                <button onClick={closeSuccessModal} className="absolute lg:right-[500px] md:right-[160px] md:top-[246.9px] md:rounded-l-none md:rounded-br-md right-7 items-center flex justify-center top-[55px] rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:top-[32px] lg:rounded-r-md w-12 h-12 bg-white">
                                    <Image
                                        src="/img/icons/close.svg"
                                        width={35}
                                        height={35}
                                        alt="Close modal icon"
                                    />
                                </button>
                                <PurchaseCard
                                    quantity={quantity}
                                    qrCode={qrCode}
                                    pixKey={buyTickets?.paymentDetails?.pixKey}
                                    ticketPrice={raffles?.raffle.ticketPrice}
                                    amount={buyTickets?.paymentDetails?.amount || 0}
                                    pixLink={buyTickets?.paymentDetails?.pixUrl}
                                />
                            </div>
                        )}

                        {show && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                                onClick={() => setShow(false)}>
                                <div
                                    className="relative lg:w-[650px] mx-4 flex flex-col items-center p-4 bg-white rounded-tr-none rounded-lg shadow-lg"
                                    onClick={(e) => e.stopPropagation()}>
                                    <Image
                                        src={raffles?.raffle.image || ""}
                                        width={400}
                                        height={400}
                                        alt="Imagem Ampliada"
                                        className="rounded-md w-full h-full object-contain"
                                    />
                                    <button
                                        onClick={() => setShow(false)}
                                        className="absolute lg:-top-0 -top-11 rounded-tl-md lg:rounded-tl-none right-0 lg:-right-10 text-2xl bg-white p-2 rounded-tr-md lg:rounded-br-md text-gray-600 hover:text-gray-800"
                                    >
                                        <IoMdClose />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </section >
    );
}
