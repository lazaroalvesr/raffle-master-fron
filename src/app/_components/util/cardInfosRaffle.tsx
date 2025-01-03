import { formatCurrency } from "@/app/hooks/formatCurrency "
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatDate"
import { InfosCardProps } from "@/lib/interface"
import { Calendar } from "lucide-react"
import Image from "next/image"

export const CardInfosRaffle = ({ endDate, quantityNumbers, ticketPrice, winnerTicketId }: InfosCardProps) => {
    const validEndDate = endDate ? new Date(endDate) : undefined;

    return (
        <Card>
            <CardHeader className="border-b bg-muted bg-[#50c878] rounded-t-md text-gray-50">
                <CardTitle className="text-xl">Informações da Rifa</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Valor Unitário:</span>
                        <Badge variant="secondary" className="text-lg">{formatCurrency(ticketPrice)}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Limite de números:</span>
                        <Badge variant="secondary" className="text-lg">{quantityNumbers}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Data do sorteio:</span>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(endDate)}</span>
                        </div>
                    </div>
                    {(winnerTicketId || (validEndDate && validEndDate.getTime() < Date.now())) && (
                        <div className="flex justify-between items-center">
                            <span className="bg-emerald-700 gap-4 w-full flex items-center justify-center text-white rounded-md text-center py-2">
                                <Image
                                    src="/img/icons/icon_festa.png"
                                    alt="Icone de Festa"
                                    width={30}
                                    height={30}
                                />
                                Sorteio Realizado
                                <Image
                                    src="/img/icons/icon_festa.png"
                                    alt="Icone de Festa"
                                    width={30}
                                    height={30}
                                />
                            </span>
                        </div>
                    )}

                </div>
            </CardContent>
        </Card>
    )
}