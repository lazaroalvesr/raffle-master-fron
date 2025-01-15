/* eslint-disable */
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from "lucide-react"
import { PurchaseBuyCardProps } from '@/lib/interface'
import Link from 'next/link'
import Image from "next/image"
import { FaRegCopy } from "react-icons/fa";
import { useState } from "react"

export default function Component({ quantity, amount, pixLink, qrCode, ticketPrice, pixKey, closeSuccessModal }: PurchaseBuyCardProps) {
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

    return (
        <Card className="w-full max-w-md bg-gray-50 relative">
            <button onClick={closeSuccessModal} className="absolute lg:-right-12 md:-right-12 md:top-0  md:rounded-l-none md:rounded-br-md right-2 items-center flex justify-center top-3 rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:top-0 lg:rounded-r-md w-16 md:w-14 lg:w-14 h-12 bg-gray-50">
                <Image
                    src="/img/icons/close.svg"
                    width={35}
                    height={35}
                    alt="Close modal icon"
                />
            </button>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Pagamento de Bilhetes
                    <Ticket className="h-6 w-6" />
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative p-4 bg-gray-50 flex items-center justify-center">
                    <Image
                        src={`data:image/png;base64,${qrCode}`}
                        width={200}
                        height={200}
                        alt="Imagem QRCODE"
                    />
                </div>
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
                    <span className="text-[11px] pt-2 font-bold  break-words">{pixKey}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Quantidade de bilhetes:</span>
                    <span className="text-2xl font-bold">{quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Valor unitário:</span>
                    <span className="text-lg">R$ {ticketPrice}</span>
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