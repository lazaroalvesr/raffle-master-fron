"use client";

import { RaffleUniqueProps } from "@/lib/interface";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { CardUniqueRaffleLoading } from "@/app/_components/home/cardRaffle";
import { CardInfosRaffle } from "@/app/_components/util/cardInfosRaffle";
import { CardBuyRaffle } from "@/app/_components/util/cardBuyRaffle";
import { CardDescriptionRaffle } from "@/app/_components/util/cardDescriptionRaffle";
import Cookies from "js-cookie";
import { useUser } from "@/app/hooks/useUsers";
import PurchaseCard from "@/app/_components/util/purchaseCard";

export default function RaffleUnique({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const token = Cookies.get("token");
    const { user } = useUser();

    const [raffles, setRaffles] = useState<RaffleUniqueProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const [buyTickets, setBuyTickets] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(0);
    
    console.log(quantity)
    const userId = user?.user.id;

    const email = user?.user.email;

    async function getRaffle() {
        try {
            setLoading(true);
            const response = await axios.get(`https://raffle-master-back.vercel.app/raffle/getById/${id}`);
            setRaffles(response.data);
        } catch (error) {
            console.error("Error fetching raffles:", error);
            setErrorMessage("Error fetching raffle details. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    async function buyTicket(quantity: number) {

        setLoadingBuy(true);
        try {
            const response = await axios.post(
                'https://raffle-master-back.vercel.app/tickets/buy',
                {
                    userId,
                    email,
                    raffleId: raffles?.id,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setBuyTickets(response.data);
            setSuccessMessage("Ticket purchased successfully!");
            console.log(response.data)
            setQuantity(quantity)
            setSuccessModalOpen(true);
        } catch (error) {
            setErrorMessage("Error purchasing ticket.");
        } finally {
            setLoadingBuy(false);
        }
    }

    useEffect(() => {
        getRaffle();
    }, [id]);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const closeSuccessModal = () => setSuccessModalOpen(false);

    return (
        <section className="max-w-7xl flex m-auto flex-col pb-12">
            {loading ? (
                <CardUniqueRaffleLoading />
            ) : (
                <div className="flex m-auto items-center justify-center lg:mx-0 mx-3">
                    <div className="flex flex-col gap-[29px] md:items-center lg:items-start">
                        <div className="flex lg:flex-row md:flex-row flex-col md:items-start lg:items-start items-center pt-[70px] md:gap-0 lg:gap-[29px]">
                            <div className="h-fit items-center lg:items-start flex flex-col">
                                <h2 className="text-[#111827] text-[26px] w-[350px] h-fit md:w-[374px] lg:w-auto lg:text-[30px]">
                                    {raffles?.name || "Raffle Name"}
                                </h2>
                                <div className="pt-[30px] mt-8 border mx-3 lg:mx-0 p-4 border-[#D9D9D9] rounded-md lg:w-[591px]" onClick={openModal}>
                                    <Image
                                        src={raffles?.image || "/img/default.jpg"}
                                        alt={raffles?.description || "Raffle image"}
                                        width={781}
                                        height={410}
                                        className="md:w-[380px] lg:w-[781px] w-[350px] h-[300px] object-contain cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col lg:pt-[49px] mt-8 gap-[29px] z-20 md:pt-[73px]">
                                <CardInfosRaffle
                                    title="Informações da Rifa"
                                    ticketPrice={raffles?.ticketPrice}
                                    quantityNumbers={raffles?.quantityNumbers}
                                    endDate={raffles?.endDate}
                                />
                                <CardBuyRaffle
                                    title="Comprar Bilhetes"
                                    handleSubmit={buyTicket}
                                    quantityNumbers={raffles?.availableTickets}
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                    loading={loadingBuy}
                                />
                            </div>
                        </div>
                        <div className="lg:-mt-[580px] md:-mt-[570px] lg:ml-0 ml-0 md:-ml-[410px]">
                            <CardDescriptionRaffle title="Descrição" />
                        </div>
                    </div>
                </div>
            )}

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                    <div className="relative border rounded-md rounded-tr-none lg:w-auto w-full mx-3 p-3 md:w-auto">
                        <button
                            className="absolute lg:top-0 lg:-right-12 right-0 -top-12 md:-top-12 md:right-0 text-4xl text-black bg-white lg:rounded-r-md lg:rounded-tl-none rounded-b-none rounded-md w-12 h-12"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        {/* <Image
                            src={raffles?.image || "/img/default.jpg"}
                            width={681}
                            height={410}
                            alt="Raffle Image"
                            className="lg:w-auto h-auto max-w-full md:w-[540px] rounded-md"
                        /> */}
                    </div>
                </div>
            )}

            {successModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                    <button onClick={closeSuccessModal} className="absolute lg:right-[488px] md:right-[140px] md:top-[313px] md:rounded-l-none md:rounded-br-md right-4 items-center flex justify-center top-[60px] rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:top-[114px] lg:rounded-r-md w-12 h-12 bg-white">
                        <Image
                            src="/img/icons/close.svg"
                            width={35}
                            height={35}
                            alt="Close modal icon"
                        />
                    </button>
                    <PurchaseCard
                        quantity={quantity}
                        qrCode={buyTickets?.paymentDetails.point_of_interaction?.transaction_data.qr_code_base64}
                        amount={buyTickets?.paymentDetails.transaction_amount || 0}
                        pixLink={buyTickets?.paymentDetails.point_of_interaction?.transaction_data.ticket_url}
                    />
                </div>
            )}
        </section>
    );
}
