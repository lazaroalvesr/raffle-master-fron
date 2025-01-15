"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"
import { formatDateWithMonthNameAndHours } from "@/lib/formatDate"
import { InfoCardReportProps } from "@/lib/interface"
import { StatusPayment } from "./statusPayment"
import { formatCurrency } from "@/app/hooks/formatCurrency "
import { useState } from "react"

export default function InfoCardReportPayment(InfoCardReport: InfoCardReportProps) {
    const [showAllTickets, setShowAllTickets] = useState(false);

    const toggleShowAllTickets = () => setShowAllTickets(!showAllTickets);

    return (
        <Card className="w-full max-w-md mx-auto relative">
            <button onClick={close} className="w-10 lg:-right-10 rounded-b-none -top-10 right-0 lg:-top-0 md:-top-0 md:-right-10 absolute  md:rounded-l-none rounded-l-md lg:rounded-l-none md:rounded-r-md rounded-r-md shadow-md rounded-bl-none rounded-br-none lg:rounded-rb-none bg-white flex items-center justify-center">
                <Image
                    src="/img/icons/close.svg"
                    width={40}
                    height={40}
                    alt="Close"
                />
            </button>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Detalhes do Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-44 text-muted-foreground">Email do Pagador:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right">{InfoCardReport?.payerEmail}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Rifa:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right">{InfoCardReport.raffle?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Data da Compra:</span>
                    <div className="flex gap-1 w-36 text-end">
                        <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                        {InfoCardReport.raffle.tickets.length > 0 ? (
                            InfoCardReport.raffle.tickets.map((raffle, index) => (
                                <span key={index} className="text-sm text-gray-500 ">
                                    {raffle.dateBuy
                                        ? formatDateWithMonthNameAndHours(raffle.dateBuy)
                                        : formatDateWithMonthNameAndHours(InfoCardReport.createdAt)}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-gray-600">
                                {formatDateWithMonthNameAndHours(InfoCardReport.createdAt)}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Números Comprados:</span>
                    <span className="text-sm font-medium text-gray-900">
                        {showAllTickets
                            ? InfoCardReport.ticketNumbers.join(", ")
                            : InfoCardReport.ticketNumbers.slice(0, 5).join(", ")}

                        {InfoCardReport.ticketNumbers.length > 5 && !showAllTickets && (
                            <button
                                onClick={toggleShowAllTickets}
                                className="text-blue-500 hover:underline ml-1"
                            >
                                ... +{InfoCardReport.ticketNumbers.length - 5} mais
                            </button>
                        )}                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Valor:</span>
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            {formatCurrency(Number(InfoCardReport.amount))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Status do Pagamento:</span>
                    <div className="flex items-center">
                        <StatusPayment infoPayment={InfoCardReport.status} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}