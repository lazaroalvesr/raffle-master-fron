import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { DranwWinnerProps } from "@/lib/interface"
import Link from "next/link"
import { formatTelephoneLinkWhatsapp } from "@/lib/formatTelephone"
import { Ticket } from "lucide-react"

export default function InfoDrawWinner({ name, email, telephone, close, number }: DranwWinnerProps) {

    return (
        <Card className="w-full max-w-md relative h-fit">
            <button onClick={close} className="w-10 lg:-right-10 rounded-b-none -top-10 right-0 lg:-top-0 md:-top-0 md:-right-10 absolute  md:rounded-l-none rounded-l-md lg:rounded-l-none md:rounded-r-md rounded-r-md shadow-md rounded-bl-none rounded-br-none lg:rounded-rb-none bg-white flex items-center justify-center">
                <Image
                    src="/img/icons/close.svg"
                    width={40}
                    height={40}
                    alt="Close"
                />
            </button>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Informações do Ganhador do Sorteio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-44 text-muted-foreground">Nome:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right text-gray-900">{name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Email:</span>
                    <span className="font-semibold lg:text-sm text-xs w-[164px] lg:w-80 text-right">{email}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Número:</span>
                    <span className="flex items-center">
                        <Ticket className="w-4 h-4 mr-2 text-primary" />
                        {number?.map((i, index) => (
                            <span key={index} className="font-semibold lg:text-sm text-xs  text-right">{i}</span>
                        ))}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Telefone:</span>
                    <Link href={formatTelephoneLinkWhatsapp(telephone)} target="_blank" rel="noopener noreferrer" className="flex font-semibold lg:text-sm text-xs gap-2">
                        <Image
                            src="/img/icons/Icone-zap.png"
                            width={20}
                            alt="e"
                            height={20}
                        />
                        {telephone}
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}