/* eslint-disable */

"use client"

import { useState } from "react";
import { formatDateWithMonthName } from "@/lib/formatDate";
import { RaffleInfoPaymento } from "@/lib/interface";
import { Calendar, Info, SearchX } from "lucide-react";
import { StatusPayment } from "./statusPayment";
import { formatCurrency } from "@/app/hooks/formatCurrency "
import InfoCardPaymentInfo from "./infoCardPaymentInfo";

export const TablePagamentosAdm = ({ raffles }: { raffles: RaffleInfoPaymento[] }) => {
    const [show, setShow] = useState(false);
    const [selectedRaffle, setSelectedRaffle] = useState<RaffleInfoPaymento | null>(null);

    function toggle(raffles: any) {
        setSelectedRaffle(raffles);
        setShow(!show);
    }

    const close = () => {
        setShow(false);
        setSelectedRaffle(null);
    };
    return (
        <div className="w-full overflow-y-auto custom-scrollbar lg:h-[580px]">
            <div className="rounded-xl w-full lg:mx-0 border bg-white shadow-sm">
                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50/40">
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500">Nome do Pagador</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Rifa</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Status Pagamento</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Quantidade de Números</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Data da Compra</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Valor</th>
                                <th className="py-4 px-4 text-center text-sm font-medium text-gray-500 lg:hidden table-cell md:table-cell">Informações</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {raffles.length === 0 ? (
                                <tr className="">
                                    <td colSpan={6} className="text-center">
                                        <div className="mx-auto flex flex-col items-center justify-center py-4">
                                            <SearchX className="h-6 w-6 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-500">
                                                Não há registros de pagamentos para esta rifa.
                                                <br />
                                                Novos pagamentos aparecerão aqui assim que forem realizados.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                raffles.map((rifa, index) => (
                                    <tr key={index} className="border-b transition-colors hover:bg-gray-50/50">
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium w-28 truncate text-gray-900">{rifa.user.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                            <div className="flex flex-col">
                                                <span className="font-medium w-40 lg:w-30 truncate text-gray-900">{rifa.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                            <div className="flex items-center gap-2">
                                                <StatusPayment infoPayment={rifa.status} />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:hidden">
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                {rifa.ticketNumbersCount} números
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 lg:flex  items-center gap-1 hidden  md:hidden">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {formatDateWithMonthName(rifa.createdAt)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                            <span className="text-sm text-gray-600">
                                                {formatCurrency(rifa.amount)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 lg:hidden md:flex">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => toggle(rifa)}
                                                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                                                    <Info className="h-5 w-5" />
                                                    <span className="sr-only">Ver informações</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
            {show && selectedRaffle && (

                <div className="fixed px-4 z-50 lg:px-0 w-full left-0 top-0 m-auto h-screen flex items-center justify-center bg-gray-400/50">
                    <div className="animate-modalShow w-full">
                        <InfoCardPaymentInfo
                            user={{ name: selectedRaffle.user.name }}
                            name={selectedRaffle?.name}
                            amount={selectedRaffle?.amount}
                            createdAt={selectedRaffle?.createdAt}
                            ticketNumbersCount={selectedRaffle?.ticketNumbersCount}
                            status={selectedRaffle.status}
                            close={close}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
