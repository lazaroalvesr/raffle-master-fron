import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { CalendarIcon, Info, SearchX  } from "lucide-react";
import { Ticket } from "@/lib/interface";
import ModalRaffleWon from "./modalInfoRaffleWon";
import { NumbersPopover } from "./numbersPopover";
import { PaginationControl } from "./pagination";
import { useResponsiveItemsPerPage } from "@/app/hooks/useResponsiveItemsPerPage";

export const TableRaffleWon = ({ tickets }: { tickets: Ticket[] }) => {
    const [show, setShow] = useState(false);
    const [selectRaffleWon, setRaffleWon] = useState<Ticket | null>(null);
    const [currentPage, setCurrentPage] = useState(1)

    function toggle(ticket: Ticket) {
        setRaffleWon(ticket);
        setShow(!show);
    }

    const itemsPerPage = useResponsiveItemsPerPage({
        itemsTablet: 11,
        itemsDefault: 9
    })

    const totalPages = Math.ceil(tickets.length / itemsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > totalPages) setCurrentPage((prev) => prev - 1)
    }

    const displayedPayments = tickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const close = () => {
        setShow(false);
        setRaffleWon(null);
    };

    return (
        <div className="w-full overflow-y-auto custom-scrollbar lg:h-[580px] lg:pb-0 pb-8">
            <div className="rounded-md w-full lg:mx-0 border bg-white shadow-sm lg:h-[508px] h-[508px] md:h-[810px]">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-50/40">
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500">Nome</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Número de Tickets</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:w-44 lg:table-cell md:table-cell">Data da Compra</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Data do Sorteio</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Valor</th>
                            <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 table-cell lg:hidden md:table-cell">Informações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {tickets.length === 0 || displayedPayments.every(ticket => !ticket.wonRaffles?.length) ? (
                            <tr className="">
                                <td colSpan={6} className="text-center">
                                    <div className="mx-auto flex flex-col items-center justify-center py-4">
                                        <SearchX className="h-6 w-6 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Você ainda não ganhou nenhuma rifa.
                                            <br />
                                            Continue participando - sua sorte pode estar no próximo sorteio!
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            displayedPayments.map((ticket) => {
                                const wonRaffle = ticket.wonRaffles?.[0];
                                return (
                                    <tr key={ticket.id} className="border-b transition-colors hover:bg-gray-50/50">
                                        <td className="px-4 py-2 w-60 md:w-32 lg:text-lg text-base overflow-hidden truncate">
                                            <p className="lg:w-72 w-32 md:w-44 truncate">
                                                {wonRaffle?.name || "Nome não disponível"}
                                            </p>
                                        </td>
                                        <td className="px-4 py-2 hidden lg:table-cell md:table-cell">
                                            <div className="flex items-center">
                                                <NumbersPopover numbers={ticket.number} />
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    {ticket.dateBuy
                                                        ? formatDate(new Date(ticket.dateBuy))
                                                        : "Data não disponível"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:hidden">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-600">
                                                    {wonRaffle?.drawDate
                                                        ? formatDate(new Date(wonRaffle.drawDate))
                                                        : "Data não disponível"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-lg hidden md:table-cell lg:table-cell">
                                            {wonRaffle?.winnerTicket.number.length && wonRaffle?.ticketPrice
                                                ? `R$ ${(wonRaffle.winnerTicket.number.length * parseFloat(wonRaffle.ticketPrice)).toFixed(2)}`
                                                : "Valor não disponível"}
                                        </td>
                                        <td className="px-4 py-2 lg:hidden md:table-cell">
                                            <button
                                                className="text-primary flex items-center justify-center w-full underline"
                                                onClick={() => toggle(ticket)}
                                            >
                                                <Info className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {show && selectRaffleWon && (
                <div className="fixed px-4 z-50 lg:px-0 w-full left-0 top-0 m-auto h-screen flex items-center justify-center bg-gray-400/50">
                    <div className="animate-modalShow w-full">
                        <ModalRaffleWon
                            tickets={tickets}
                            close={close}
                        />
                    </div>
                </div>
            )}
            <div className="flex mt-8 lg:flex-row flex-col items-center justify-center m-auto lg:text-start lg:items-start">
                <PaginationControl
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};
