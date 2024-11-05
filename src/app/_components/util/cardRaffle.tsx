import { CardRaffleProps } from "@/lib/interface"
import Image from "next/image"
import Link from "next/link"

export const CardRaffle = ({ src, text, href }: CardRaffleProps) => {
    return (
        <Link href={href}>
            <div className="lg:w-[373px] h-[490px] w-[350px] border-2 border-[#D9D9D9] rounded-xl">
                <div className="h-[266px] lg:w-full w-full flex rounded-xl  border border-gray-50">
                    <Image
                        src={src}
                        width={380}
                        height={300}
                        alt="Foto picanha"
                        className="h-[264px] lg:w-[380px] w-full object-contain rounded-t-md"
                    />
                </div>
                <div className="pt-[19px] flex flex-col items-center justify-center border-t ">
                    <div className="flex  text-left justify-start items-start w-full">
                        <p className="lg:text-[20px] font-medium pl-7 text-[18px] text-[#111827]">{text}</p>
                    </div>
                    <div className="pt-[24px] flex gap-[19px]">
                        <div className="bg-[#F2F2F2] w-[92px] text-[#28A745] h-[53px] flex flex-col text-center items-center justify-center rounded-md">
                            <p className="text-[14px]">Números</p>
                            <p className="text-[14px]">100</p>
                        </div>
                        <div className="bg-[#F2F2F2] w-[92px] h-[53px] text-[#F48824] flex flex-col text-center items-center justify-center rounded-md">
                            <Image
                                src={"/img/icons/Info.png"}
                                width={25}
                                height={25}
                                alt="Foto picanha"
                            />
                        </div>
                        <div className="bg-[#F2F2F2] w-[92px] text-[#C2352A] h-[53px] flex flex-col text-center items-center justify-center rounded-md">
                            <Image
                                src={"/img/icons/seguranca.png"}
                                width={30}
                                height={30}
                                alt="Foto picanha"
                            />
                        </div>
                    </div>
                    <button className="bg-[#50C878] text-white flex  items-center justify-center w-[312px] mt-[19px] rounded-md h-[41px] gap-2">
                        <Image
                            src="/img/icons/ticket.svg"
                            width={21}
                            height={21}
                            alt="Icone Ticket"
                        />
                        <p>Adquirir Bilhetes</p>
                    </button>
                </div>
            </div>
        </Link>
    )
}