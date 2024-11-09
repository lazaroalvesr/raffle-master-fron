/* eslint-disable */
"use client";

import { RaffleUniqueProps } from "@/lib/interface";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { CardUniqueRaffleLoading } from "@/app/_components/home/cardRaffleLoading";
import { CardInfosRaffle } from "@/app/_components/util/cardInfosRaffle";
import { CardDescriptionRaffle } from "@/app/_components/util/cardDescriptionRaffle";
import Cookies from "js-cookie";
import { useUser } from "@/app/hooks/useUsers";
import PurchaseCard from "@/app/_components/util/purchaseCard";
import { ButtonCardBuyRaffle } from "@/app/_components/util/buttonCardBuyRaffle";
import { BaseURL } from "@/app/api/api";

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

    const userId = user?.user.id;
    const email = user?.user.email;
    const maxTickets = Number(raffles?.raffle.quantityNumbers);

    async function getRaffle() {
        try {
            setLoading(true);
            const response = await axios.get(`${BaseURL}raffle/getById/${id}`);
            console.log(response)
            setRaffles(response.data);
        } catch (error) {
            setErrorMessage("Error fetching raffle details. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function buyTicket(quantity: number) {
        setLoadingBuy(true);
        try {
            setErrorMessage("")
            const response = await axios.post(
                `${BaseURL}tickets/buy`,
                { userId, email, raffleId: (await params).id, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response)

            setBuyTickets(response.data);
            setSuccessMessage("")
            setSuccessMessage("Números comprado com sucesso!");
            setQuantity(quantity);
            setSuccessModalOpen(true);
            setQrCode(response.data.paymentDetails.qrCode); // Atualize de acordo com o formato de resposta da sua API
        } catch (error: any) {
            setErrorMessage("Erro ao comprar número.");
        } finally {
            setLoadingBuy(false);
        }

    }

    useEffect(() => {
        getRaffle();
    }, [id]);

    const [count, setCount] = useState(1);

    const handleSetCount = (value: number) => {
        setCount((prevCount) => Math.min(prevCount + value, maxTickets));
    };

    const handleDecrement = () => {
        if (count > 1) setCount(count - 1);
    };

    const handleIncrement = () => {
        if (count < Number(raffles?.availableTickets)) {
            setCount(count + 1);
        }
    };

    const closeSuccessModal = () => setSuccessModalOpen(false);
    const numbersSoldOut = Number(raffles?.availableTickets) === 0;

    return (
        <section className="max-w-7xl grid m-auto grid-cols-1 lg:ml-44 lg:pb-32 pb-12">
            {loading ? (
                <CardUniqueRaffleLoading />
            ) : (
                <div className="grid m-auto items-center justify-center lg:mx-2 mx-3">
                    <div className="flex flex-col gap-[29px] md:items-center lg:items-start">
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:items-start lg:items-start items-center pt-[70px] md:gap-0 lg:gap-[29px]">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="h-fit items-center lg:items-start flex flex-col">
                                    <h2 className="text-[#111827] text-[26px] w-[350px] h-fit md:w-[374px] lg:w-auto lg:text-[30px]">
                                        {raffles?.raffle?.name || "Raffle Name"}
                                    </h2>
                                    <div className="pt-[30px] mt-8 border mx-3 lg:mx-0 p-4 border-[#D9D9D9] rounded-md lg:w-[591px]">
                                        <Image
                                            src={raffles?.raffle?.image || "/img/default.jpg"}
                                            alt={raffles?.raffle?.description || "Raffle image"}
                                            width={781}
                                            height={410}
                                            className="md:w-[380px] lg:w-[781px] w-[350px] lg:h-[300px] h-[200px] md:h-[240px] object-contain cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:pt-[49px] mt-8 gap-[29px] z-20 md:pt-[40px]">
                                <CardInfosRaffle
                                    title="Informações da Rifa"
                                    ticketPrice={raffles?.raffle?.ticketPrice}
                                    quantityNumbers={maxTickets}
                                    endDate={raffles?.raffle?.endDate}
                                />
                                <div className="relative flex">
                                    <div className="border border-[#D9D9D9] md:w-[380px] mx-3  lg:mx-0 lg:w-[480px] rounded-md pb-8">
                                        <div className="border-b border-[#D9D9D9] bg-[#F6F5F5] text-center py-[12px] rounded-t-md">
                                            <p className="text-gray-800 text-[24px] font-medium">Quantidade</p>
                                        </div>
                                        <div className="grid grid-cols-1 px-3">
                                            <div className="grid grid-cols-1 items-center pt-[20px]">
                                                <span className="font-medium text-[20px] text-black text-center">
                                                    Participe sem estresse! O site faz a escolha dos números para você!
                                                </span>
                                                <div className="mt-[20px] border items-center flex border-black w-[330px] lg:w-full h-[70px] rounded-[10px]">
                                                    <div className="flex items-center justify-center m-auto gap-4">
                                                        <button onClick={handleDecrement} disabled={loadingBuy || numbersSoldOut} className={`${numbersSoldOut ? 'cursor-not-allowed' : ""}`}>
                                                            <Image
                                                                src="/img/icons/icon-decrement.png"
                                                                width={47}
                                                                height={47}
                                                                alt="Decrement icon"
                                                            />
                                                        </button>
                                                        <div className="bg-[#111827] w-[190px] lg:w-[280px] h-[42px] flex items-center justify-center rounded-[10px] text-center text-[24px] text-white">
                                                            {count}
                                                        </div>
                                                        <button onClick={handleIncrement} disabled={loadingBuy || numbersSoldOut} className={`${numbersSoldOut ? 'cursor-not-allowed' : ""}`}>
                                                            <Image
                                                                src="/img/icons/icon-plus.png"
                                                                width={47}
                                                                height={47}
                                                                alt="Decrement icon"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="pt-[20px] flex flex-wrap items-center m-auto justify-normal w-[330px] lg:w-[430px] gap-3 lg:gap-7">
                                                    <ButtonCardBuyRaffle number="+1" onClick={() => handleSetCount(1)} loading={loadingBuy || numbersSoldOut} />
                                                    <ButtonCardBuyRaffle number="+5" onClick={() => handleSetCount(5)} loading={loadingBuy || numbersSoldOut} />
                                                    <ButtonCardBuyRaffle number="+10" onClick={() => handleSetCount(10)} loading={loadingBuy || numbersSoldOut} />
                                                    <ButtonCardBuyRaffle number="+15" onClick={() => handleSetCount(15)} loading={loadingBuy || numbersSoldOut} />
                                                    <ButtonCardBuyRaffle number="+20" onClick={() => handleSetCount(20)} loading={loadingBuy || numbersSoldOut} />
                                                </div>
                                                <button
                                                    onClick={() => buyTicket(count)}
                                                    disabled={loadingBuy || numbersSoldOut}
                                                    className={`bg-[#111827] w-[330px] lg:w-full h-[62px] rounded-[10px] mt-[20px] font-medium text-[25px] text-white
        ${Number(raffles?.availableTickets) === 0 ? "bg-red-500 cursor-not-allowed" : ""}
        ${loadingBuy ? "opacity-50 cursor-not-allowed" : ""}`}
                                                >
                                                    {loadingBuy ? "Comprando..." : Number(raffles?.availableTickets) === 0 ? "Bilhetes Esgotados" : "Comprar"}
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="absolute lg:w-[440px] w-[300px] flex items-center justify-center m-auto left-10 lg:left-5 md:left-14 -bottom-4 md:-bottom-12 lg:-bottom-12">
                                        {successMessage && <div className="alert alert-success rounded-md w-full bg-emerald-400 text-center py-2 text-white">{successMessage}</div>}
                                        {errorMessage && <div className="alert alert-error rounded-md w-full bg-red-400 text-center py-2 text-white">{errorMessage}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:-mt-[550px] md:-mt-[530px] mt-[24px]">
                                <CardDescriptionRaffle title="Descrição" />
                            </div>
                        </div>

                    </div>
                    {successModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                            <button onClick={closeSuccessModal} className="absolute lg:right-[488px] md:right-[140px] md:top-[276px] md:rounded-l-none md:rounded-br-md right-4 items-center flex justify-center top-[60px] rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:top-[78px] lg:rounded-r-md w-12 h-12 bg-white">
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
                                ticketPrice={raffles?.raffle.ticketPrice}
                                amount={buyTickets?.paymentDetails?.amount || 0}
                                pixLink={buyTickets?.paymentDetails?.pixUrl}
                            />
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
