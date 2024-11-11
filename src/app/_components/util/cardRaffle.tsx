import { CardRaffleProps } from "@/lib/interface"
import Image from "next/image"
import Link from "next/link"
import { Check, Info, Ticket } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const CardRaffle = ({ src, text, href , quantityNumbers}: CardRaffleProps) => {
    
    return (
        <Link href={href} className="w-full px-4">
            <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                        src={src}
                        width={400}
                        height={200}
                        alt="Kit Churrasco e Cerveja"
                        className="object-cover w-full rounded-md h-full transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <CardHeader className="relative z-10 -mt-14 pb-4">
                    <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">
                        {text}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex justify-between items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                            <Ticket className="w-4 h-4 text-gray-600" />
                            <span className="font-medium text-gray-900">{quantityNumbers} números</span>
                        </div>

                        <div className="flex gap-2">
                            <Badge variant="outline" className="bg-blue-50 hover:bg-blue-100 cursor-help">
                                <Info className="w-4 h-4 text-blue-500" />
                            </Badge>
                            <Badge variant="outline" className="bg-green-50">
                                <Check className="w-4 h-4 text-green-500" />
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🥩</span>
                            <span className="text-gray-600">Picanha Premium</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🍺</span>
                            <span className="text-gray-600">Cerveja Artesanal</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        size="lg">
                        <Ticket className="mr-2 h-5 w-5" />
                        Adquirir Bilhetes
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}