import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Calendar } from "lucide-react"
import Image from "next/image"
import { formatDateWithMonthName } from "@/lib/formatDate"
import { InfoRaffleCardProps } from "@/lib/interface"
import { StatusPayment } from "./statusPayment"
import { formatCurrency } from "@/app/hooks/formatCurrency "

export default function InfoCardPaymentInfo({ name, amount, createdAt, status, ticketNumbersCount, user, close }: InfoRaffleCardProps) {

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
                    <span className="text-sm font-medium w-44 text-muted-foreground">Nome Pagador:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right">{user?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Rifa:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right">{name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Data da Compra:</span>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-semibold ">
                            {formatDateWithMonthName(createdAt)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Quantidade de Números:</span>
                    <span className="text-sm font-medium text-gray-900">
                        {ticketNumbersCount} números
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Valor:</span>
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            {formatCurrency(Number(amount))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                    <div className="flex items-center">
                        <StatusPayment infoPayment={status} />
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}