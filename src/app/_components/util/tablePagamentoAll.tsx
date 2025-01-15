/* eslint-disable */

"use client"

import { useState } from "react";
import { formatDateWithMonthNameAndHours } from "@/lib/formatDate";
import { PaymentInfoAllProps } from "@/lib/interface";
import { AlertCircle, Calendar, CheckCircle, Clock, Info, SearchX } from "lucide-react";
import { StatusPayment } from "./statusPayment";
import { formatCurrency } from "@/app/hooks/formatCurrency "
import { useResponsiveItemsPerPage } from "@/app/hooks/useResponsiveItemsPerPage";
import { PaginationControl } from "./pagination";
import InfoCardReportPayment from "./infoCardReportPayment";
import { NumbersPopover } from "./numbersPopover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const TablePagamentosAll = ({ raffles }: { raffles: PaymentInfoAllProps[] }) => {
    const [show, setShow] = useState(false);
    const [selectedRaffle, setSelectedRaffle] = useState<PaymentInfoAllProps | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = useResponsiveItemsPerPage({
        itemsTablet: 9,
        itemsDefault: 5
    })

    const totalPages = Math.ceil(raffles.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1)
    }

    const displayedPayments = raffles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    function toggle(raffles: any) {
        setSelectedRaffle(raffles);
        setShow(!show);
    }

    const close = () => {
        setShow(false);
        setSelectedRaffle(null);
    };

    const paymentCancelled = raffles.filter(payment => payment.status === 'cancelled')
    const paymentPending = raffles.filter(payment => payment.status === 'pending')
    const paymentApproved = raffles.filter(payment => payment.status === 'approved')

    return (
        <div className="-mt-2">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">{paymentCancelled.length}</div>
                        <p className="text-xs text-muted-foreground">Pagamentos cancelados</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-500">{paymentPending.length}</div>
                        <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{paymentApproved.length}</div>
                        <p className="text-xs text-muted-foreground">Pagamentos confirmados</p>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full overflow-y-auto custom-scrollbar lg:h-[480px] lg:pb-0 pb-8 mt-4 lg:mt-3">
                <div className="rounded-md w-full border bg-white shadow-sm lg:h-[404px] h-[405px] md:h-[684px]">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full border-collapse static">
                            <thead>
                                <tr className="border-b bg-gray-50/40">
                                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-500">Email do Comprador</th>
                                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Rifa</th>
                                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Status Pagamento</th>
                                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Números Comprados</th>
                                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Data da Compra</th>
                                    <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Valor</th>
                                    <th className="py-4 px-4 text-center text-sm font-medium text-gray-500 lg:hidden table-cell md:table-cell">Informações</th>
                                </tr>
                            </thead>
                            <tbody className="w-full text-gray-600">
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
                                    displayedPayments.map((rifa, index) => (
                                        <tr key={index} className="border-b transition-colors hover:bg-gray-50/50 h-[70px] items-center">
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium w-28 lg:w-40 truncate text-gray-900">{rifa.payerEmail}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                                <div className="flex flex-col">
                                                    <span className="font-medium w-40 lg:w-[200px] truncate text-gray-900">{rifa.raffle.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                                <div className="flex items-center gap-2 ">
                                                    <StatusPayment infoPayment={rifa.status} />
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 hidden lg:table-cell md:hidden lg:w-52">
                                                <span className="inline-flex z-50 items-center rounded-full  bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                    <NumbersPopover numbers={rifa.ticketNumbers} />
                                                </span>
                                            </td>
                                            <td className="py-4 h-[69px] px-4 lg:flex items-center gap-1 hidden md:hidden">
                                                <Calendar className="h-4 w-4 text-gray-500" />
                                                <span key={index} className="text-sm text-gray-600">
                                                    {formatDateWithMonthNameAndHours(rifa.createdAt)}
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
                            <InfoCardReportPayment
                                id={selectedRaffle.id}
                                payerEmail={selectedRaffle.payerEmail}
                                amount={selectedRaffle.amount}
                                raffle={selectedRaffle.raffle}
                                ticketNumbers={selectedRaffle.ticketNumbers}
                                createdAt={selectedRaffle.createdAt}
                                status={selectedRaffle.status}
                                close={close}
                            />
                        </div>
                    </div>
                )}
                <div className="flex mt-5 lg:flex-row flex-col text-center items-center lg:text-start lg:items-start">
                    <div className="flex items-center">
                        <p>Quantidade de Pagamentos: <span className="font-bold">{raffles.length}</span></p>
                    </div>
                    <div className="items-center justify-center m-auto lg:pt-0 pt-4">
                        <PaginationControl
                            setCurrentPage={setCurrentPage}
                            handleNextPage={handleNextPage}
                            handlePrevPage={handlePrevPage}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
