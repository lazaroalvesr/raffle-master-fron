import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, Calendar } from "lucide-react"
import { formatDate } from "@/lib/formatDate"
import { InfoRaffleProps } from "@/lib/interface"
import { formatCurrency } from "@/app/hooks/formatCurrency "
import { IoMdClose } from "react-icons/io";

export default function InfoCardRaffle({ name, availableTickets,quantityNumbers, endDate, ticketPrice, isRaffleActive, close }: InfoRaffleProps) {

    return (
        <Card className="w-full max-w-md mx-auto relative">
            <button onClick={close} className="w-12 h-12 lg:-right-12 rounded-b-none -top-10 right-0 lg:-top-0 md:-top-0 md:-right-12 absolute  md:rounded-l-none rounded-l-md lg:rounded-l-none md:rounded-r-md rounded-r-md shadow-md rounded-bl-none rounded-br-none lg:rounded-rb-none bg-white flex items-center justify-center">
                <IoMdClose size={30} />
            </button>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Detalhes da Rifa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Rifa:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[200px] lg:w-80 text-right">{name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Data do Sorteio:</span>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-semibold ">
                            {formatDate(endDate)}
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Valor p/Número:</span>
                    <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(Number(ticketPrice))}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Números Disponíveis:</span>
                    <div className="flex items-center">
                        <Ticket className="w-4 h-4 mr-2 text-primary" />
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-sm font-medium text-emerald-700">
                                {availableTickets} números
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Quantidade de Números:</span>
                    <div className="flex items-center">
                        <Ticket className="w-4 h-4 mr-2 text-primary" />
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-sm font-medium text-emerald-700">
                                {quantityNumbers} números
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                    <button
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${isRaffleActive(endDate)
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                    >
                        {isRaffleActive(endDate) ? 'Ativa' : 'Inativa'}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}