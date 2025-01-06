/* eslint-disable */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket as TicketIcon, } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { formatDate } from "@/lib/formatDate"
import { Ticket } from "@/lib/interface"

export default function ModalRaffleWon({ tickets, close }: { tickets: Ticket[], close: () => void }) {
    const [showAllTickets, setShowAllTickets] = useState(false);
    const toggleShowAllTickets = () => setShowAllTickets(!showAllTickets);

    return (
        <Card className="w-full max-w-md mx-auto relative">
            <button onClick={close} className="absolute lg:-right-[40px] md:-right-[42px] md:top-0 md:rounded-l-none md:rounded-br-md right-0 items-center flex justify-center -top-10 rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:top-0 lg:rounded-r-md w-12 h-12 bg-white">
                <Image
                    src="/img/icons/close.svg"
                    width={35}
                    height={35}
                    alt="Close modal icon"
                />
            </button>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Informações da Rifa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {tickets && tickets.length > 0 ? (
                    tickets.map((ticket) => {
                        const wonRaffle = ticket.wonRaffles?.[0]
                        return (
                            <div key={ticket.id} className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Rifa:</span>
                                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right">{wonRaffle.name}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Número de Tickets:</span>
                                    <div className="flex items-center">
                                        <TicketIcon className="w-4 h-4 mr-2 text-primary" />
                                        <span className="font-semibold text-sm">
                                            {showAllTickets
                                                ? ticket.number.join(", ")
                                                : ticket.number.slice(0, 5).join(", ")}

                                            {ticket.number.length > 5 && !showAllTickets && (
                                                <button
                                                    onClick={toggleShowAllTickets}
                                                    className="text-blue-500 hover:underline ml-1"
                                                >
                                                    ... +{ticket.number.length - 5} mais
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Data da Compra:</span>
                                    <span className="font-semibold">{formatDate(ticket.dateBuy)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Data do S:</span>
                                    <span className="font-semibold">{formatDate(wonRaffle.drawDate)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Valor:</span>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/img/icons/IconPix.svg"
                                            width={16}
                                            height={16}
                                            alt="Icone pix"
                                        />
                                        <span className="font-semibold">
                                            {wonRaffle?.ticketPrice
                                                ? `R$ ${wonRaffle.ticketPrice}`
                                                : "Valor não disponível"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : ("")}
            </CardContent>
        </Card>
    )
}