'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from "lucide-react"
import { PurchaseBuyCardProps } from '@/lib/interface'
import Link from 'next/link'

export default function Component({ quantity, amount, pixLink, qrCode }: PurchaseBuyCardProps) {

    return (
        <Card className="w-full max-w-md mx-4 lg:mx-0">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Pagamento de Bilhetes
                    <Ticket className="h-6 w-6" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className='items-center justify-center flex'>
                    <img
                        src={qrCode}
                        width={40}
                        height={40}
                        alt='QR CODE PAGAMENTO'
                        className=' w-40 h-40'
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Quantidade de bilhetes:</span>
                    <span className="text-2xl font-bold">{quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Valor unitário:</span>
                    <span className="text-lg">R$ {amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-base font-semibold">Valor total:</span>
                    <span className="text-2xl font-bold">
                        R$ {amount.toFixed(2)}
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                {pixLink ? (
                    <Link href={pixLink} className="w-full" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full">Ir para Pagamento PIX</Button>
                    </Link>
                ) : (
                    <Button disabled className="w-full">Carregando link de pagamento...</Button>
                )}
            </CardFooter>
        </Card>

    )
}