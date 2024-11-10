import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatCurrency "
import { formatDate } from "@/lib/formatDate"
import { InfosCardProps } from "@/lib/interface"
import { Calendar } from "lucide-react"

export const CardInfosRaffle = ({ endDate, quantityNumbers, ticketPrice }: InfosCardProps) => {
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
                </div>
            </CardContent>
        </Card>
    )
}