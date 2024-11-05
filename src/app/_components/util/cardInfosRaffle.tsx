import { formatCurrency } from "@/lib/formatCurrency "
import { formatDate } from "@/lib/formatDate"
import { InfosCardProps } from "@/lib/interface"

export const CardInfosRaffle = ({ endDate, quantityNumbers, ticketPrice, title }: InfosCardProps) => {
    return (
        <div className="border border-[#D9D9D9] mx-3 lg:mx-0 lg:w-[480px] md:w-[380px] rounded-md">
            <div className="border-b border-[#D9D9D9]  bg-[#F6F5F5] text-center py-[12px] rounded-t-md">
                <p className="text-gray-800 text-[24px] font-medium ">{title}</p>
            </div>
            <div>
                <ul className="px-8 py-8 flex flex-col gap-5">
                    <li className="text-black gap-2 flex text-[22px] lg:text-[24px]"><span className="font-bold ">Valor Unitário:</span>{formatCurrency(ticketPrice)}</li>
                    <li className="text-black gap-2 flex text-[22px] lg:text-[24px]"><span className="font-bold ">Limite de números:</span>{quantityNumbers}</li>
                    <li className="text-black gap-2 flex text-[22px] lg:text-[24px]"><span className="font-bold ">Data do sorteio:</span>{formatDate(endDate)}</li>
                </ul>
            </div>
        </div>
    )
}