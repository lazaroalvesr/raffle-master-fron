/* eslint-disable */
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { StatusPaymentCard } from "./statusPaymentCard"
import { formatDate } from "@/lib/formatDate"
import { InfoPaymentProps } from "@/lib/interface"
import { FaRegCopy } from "react-icons/fa"

export default function PaymentInfoCard({ paymentMethod, close, namePayer, infoDateBuy, numTickets, infoPayment, pixLink, nameRafle, pixKey }: InfoPaymentProps) {
    const [showAllTickets, setShowAllTickets] = useState(false);
    const [showOK, setShowOk] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(pixKey);
            setShowOk(true)
        } catch (err) {
            setShowOk(false)
            throw new Error("Erro ao copiar chave PIX");
        }
    }
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
                <CardTitle className="text-2xl font-bold text-primary">Informações de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Rifa:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right">{nameRafle}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Nome Pagador:</span>
                    <span className="font-semibold">{namePayer}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Data da Compra:</span>
                    <span className="font-semibold">{formatDate(infoDateBuy)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Método de Pagamento:</span>
                    <div className="flex items-center gap-2">
                        <Image
                            src="/img/icons/IconPix.svg"
                            width={16}
                            height={16}
                            alt="Icone pix"
                        />
                        <span className="font-semibold">{paymentMethod}</span>
                    </div>
                </div>
                {infoPayment === 'pending' && (
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Chave PIX copia e cola</span>
                            {!showOK ? (
                                <button onClick={copyToClipboard}><FaRegCopy /></button>
                            ) : (
                                <Image
                                    src="/img/icons/ok.png"
                                    alt="Icone OK"
                                    width={20}
                                    height={20}
                                />
                            )}
                        </div>
                        <span className="text-[10px] lg:text-[11px] md:text-[11px] pt-2 font-bold break-words">{pixKey}</span>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Número de Tickets:</span>
                    <div className="flex items-center text-right">
                        <div className="font-semibold text-sm flex items-start">
                            <Ticket className="w-4 h-4 mr-1 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex flex-col">
                                {showAllTickets
                                    ? numTickets.join(", ")
                                    : numTickets.slice(0, 5).join(", ")}

                                {numTickets.length > 5 && !showAllTickets && (
                                    <button
                                        onClick={toggleShowAllTickets}
                                        className="text-blue-500 hover:underline ml-1"
                                    >
                                        ... +{numTickets.length - 5} mais
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                    <Badge variant="none" className="text-sm  -mr-4 border-none bg-none">
                        <StatusPaymentCard infoPayment={infoPayment || ""} />
                    </Badge>
                </div>
            </CardContent>
            {infoPayment === "pending" && (
                <CardFooter>
                    <Link href={pixLink} className="w-full" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full" variant="outline">
                            <QrCode className="w-4 h-4 mr-2" />
                            Pagar com PIX
                        </Button>
                    </Link>
                </CardFooter>
            )}
        </Card>
    )
}