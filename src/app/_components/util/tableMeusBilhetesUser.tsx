import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { StatusPayment } from "./statusPayment";
import PaymentInfoCard from "./paymentInfoCard";
import { TableProps, TicketInterface } from "@/lib/interface";
import { formatCurrency } from "@/app/hooks/formatCurrency ";
import { Calendar, InfoIcon, SearchX } from "lucide-react";
import { PaginationControl } from "./pagination";
import { useResponsiveItemsPerPage } from "@/app/hooks/useResponsiveItemsPerPage";
import { NumbersPopover } from "./numbersPopover";

export const TableMeusBilhetesUser = ({ tickets = [] }: TableProps) => {
    const [show, setShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(null);
    const [currentPage, setCurrentPage] = useState(1)

    function toggle(ticket: TicketInterface) {
        setSelectedTicket(ticket);
        setShow(!show);
    }

    const itemsPerPage = useResponsiveItemsPerPage({
        itemsTablet: 11,
        itemsDefault: 8
    })

    const totalPages = Math.ceil(tickets.length / itemsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1)
    }

    const close = () => {
        setShow(false);
        setSelectedTicket(null);
    };

    const displayedPayments = tickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full overflow-y-auto custom-scrollbar lg:h-[580px] lg:pb-0 pb-8">
            <div className="rounded-md w-full lg:mx-0 border bg-white shadow-sm lg:h-[508px] h-[508px] md:h-[810px]">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-50/40">
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500">Nome</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Status Pagamento</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Números Comprados</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Data da Compra</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Valor</th>
                            <th className="py-4 px-4 text-center text-sm font-medium text-gray-500 table-cell ">Informações</th>
                        </tr>
                    </thead>
                    <tbody className="w-full text-gray-600">
                        {tickets.length === 0 ? (
                            <tr className="">
                                <td colSpan={6} className="text-center">
                                    <div className="mx-auto flex flex-col items-center justify-center py-4">
                                        <SearchX className="h-6 w-6 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Não há registros de bilhetes comprados para este participante.
                                            <br />
                                            Novos bilhetes comprados aparecerão aqui assim que forem realizados.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            displayedPayments.map((ticket, index) => (
                                <tr key={index} className="border-t transition-colors hover:bg-gray-50/50">
                                    <td className="p-4">{ticket.infosName}</td>
                                    <td className="p-4 lg:table-cell hidden md:table-cell">
                                        <span>
                                            <StatusPayment infoPayment={ticket.infoPayment} />
                                        </span>
                                    </td>
                                    <td className="p-4 lg:table-cell hidden md:table-cell">
                                        <NumbersPopover numbers={ticket.ticketNumbers || []} />
                                    </td>
                                    <td className="p-4 text-gray-600 lg:flex hidden items-center gap-1 ">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span>{formatDate(ticket.infoDateBuy)}</span>
                                    </td>
                                    <td className="p-4 text-gray-600 lg:table-cell hidden">
                                        {formatCurrency(ticket.infoAmout)}
                                    </td>
                                    <td className="p-4  flex justify-center">
                                        <button
                                            onClick={() => toggle(ticket)}
                                            className="text-gray-500 hover:text-gray-700">
                                            <InfoIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {show && selectedTicket && (
                <div className="fixed px-4 z-50 lg:px-0 w-full left-0 top-0 m-auto h-screen flex items-center justify-center bg-gray-400/50">
                    <div className="animate-modalShow w-full">
                        <PaymentInfoCard
                            nameRafle={selectedTicket.nameRafle}
                            namePayer={selectedTicket.infoNamePayer}
                            paymentMethod="PIX"
                            pixKey={selectedTicket.pixKey}
                            infoDateBuy={selectedTicket.infoDateBuy}
                            numTickets={selectedTicket.ticketNumbers}
                            infoPayment={selectedTicket.infoPayment}
                            pixLink={selectedTicket.pixLink}
                            close={close}
                        />
                    </div>
                </div>
            )}
            <div className="flex mt-8 lg:flex-row flex-col items-center justify-center m-auto lg:text-start lg:items-start">
                <PaginationControl
                    setCurrentPage={setCurrentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};