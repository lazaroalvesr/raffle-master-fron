import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { CalendarIcon, Info, Ticket as TicketIcon } from "lucide-react";
import { Ticket } from "@/lib/interface";
import ModalRaffleWon from "./modalInfoRaffleWon";

export const TableRaffleWon = ({ tickets }: { tickets: Ticket[] }) => {
    const [show, setShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    function toggle(ticket: Ticket) {
        setSelectedTicket(ticket);
        setShow(!show);
    }

    const close = () => {
        setShow(false);
        setSelectedTicket(null);
    };

    return (
        <div className="border rounded-md w-full flex overflow-y-auto custom-scrollbar lg:h-[580px]">
            <div className="overflow-x-scroll w-full lg:overflow-visible relative">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr className="text-[17px]">
                            <th scope="col" className="px-4 py-2 h-4 text-left">Nome</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell text-base text-nowrap">Número de Tickets</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell text-base text-nowrap">Data da Compra</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell text-base text-nowrap">Data do Sorteio</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell">Valor</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left lg:hidden table-cell md:hidden">Informações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {tickets && tickets.length > 0 ? (
                            tickets.map((ticket) => {
                                const wonRaffle = ticket.wonRaffles?.[0];
                                return (
                                    <tr key={ticket.id}>
                                        <td className="px-4 py-2 w-60 md:w-32 lg:text-lg text-base overflow-hidden truncate">
                                            <p className="lg:w-72 w-32 md:w-44 truncate">
                                                {wonRaffle?.name || "Nome não disponível"}
                                            </p>
                                        </td>
                                        <td className="px-4 py-2 hidden lg:table-cell md:table-cell">
                                            <div className="flex items-center">
                                                <TicketIcon className="w-4 h-4 mr-2 text-primary" />
                                                {ticket.number.join(", ")}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:hidden">
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
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    Nenhum dado disponível
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {show && selectedTicket && (
                <div className="fixed px-4 z-50 lg:px-0 w-full left-0 top-0 m-auto h-screen flex items-center justify-center bg-gray-400/50">
                    <div className="animate-modalShow w-full">
                        <ModalRaffleWon
                            tickets={tickets}
                            close={close}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
