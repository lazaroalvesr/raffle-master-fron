import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { StatusPaymentCard } from "./StatusPaymentCard"

interface InfoPaymentProps {
    nameRafle: string
    namePayer: string | any
    infoPayment: string | any
    paymentMethod: "PIX"
    numTickets: number[] | any
    pixLink: string
    close: () => void
}

export default function PaymentInfoCard({ paymentMethod, close, namePayer, numTickets, infoPayment, pixLink, nameRafle }: InfoPaymentProps) {
    const [showAllTickets, setShowAllTickets] = useState(false);

    const toggleShowAllTickets = () => setShowAllTickets(!showAllTickets);
    return (
        <Card className="w-full max-w-md mx-auto relative">
            <button onClick={close} className="w-10 lg:-right-10 -top-10 right-0 lg:-top-0 md:-top-0 md:-right-10 absolute shadow-md md:rounded-l-none rounded-l-md lg:rounded-l-none md:rounded-r-md rounded-r-md rounded-b-none lg:rounded-rb-none bg-white flex items-center justify-center">
                <Image
                    src="/img/icons/close.svg"
                    width={40}
                    height={40}
                    alt="Close"
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
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Número de Tickets:</span>
                    <div className="flex items-center">
                        <Ticket className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-semibold text-sm">
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
                        </span>
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
                    <Link href={pixLink} className="w-full" target="_blank">
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