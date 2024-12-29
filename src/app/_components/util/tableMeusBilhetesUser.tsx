import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { StatusPayment } from "./statusPayment";
import PaymentInfoCard from "./paymentInfoCard";
import { TableProps, TicketInterface } from "@/lib/interface";
import { formatCurrency } from "@/app/hooks/formatCurrency ";
import { Info, Ticket } from "lucide-react";

export const TableMeusBilhetesUser = ({ tickets = [] }: TableProps) => {
    const [show, setShow] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(null);

    function toggle(ticket: TicketInterface) {
        setSelectedTicket(ticket);
        setShow(!show);
    }

    const close = () => {
        setShow(false);
        setSelectedTicket(null);
    };

    return (
        <div className="border rounded-md w-full flex overflow-y-auto custom-scrollbar lg:h-[580px]">
            <div className=" overflow-x-scroll w-full  lg:overflow-visible relative">
                <table className="w-full">
                    <thead className=" bg-gray-100">
                        <tr className="text-[17px]">
                            <th scope="col" className="px-4 py-2 h-4 text-left">Nome</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell text-base text-nowrap">Status Pagamento</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell text-base text-nowrap">Número de Tickets</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell text-base text-nowrap">Data da compra</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell">Valor</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left">Informações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 w-60 md:w-32 lg:text-lg text-base overflow-hidden truncate">
                                        <p className="w-32 truncate">{ticket.infosName || "Nome não disponível"}</p>
                                    </td>
                                    <td className="px-4 py-2  hidden lg:table-cell md:table-cell">
                                        <StatusPayment infoPayment={ticket.infoPayment} />
                                    </td>
                                    <td className="px-4 py-2 text-lg md:text-base hidden md:table-cell lg:table-cell">
                                        <div className="flex items-center">
                                            <Ticket className="w-4 h-4 mr-2 text-primary" />
                                            {ticket.ticketNumbers}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2  text-lg  hidden md:table-cell lg:table-cell">
                                        {ticket.infoDateBuy ? formatDate(ticket.infoDateBuy) : "Data não disponível"}
                                    </td>
                                    <td className="px-4 py-2  text-lg hidden lg:table-cell">
                                        {ticket.infoAmout ? formatCurrency(ticket.infoAmout) : "Valor não disponível"}
                                    </td>
                                    <td className="px-4 py-2 lg:text-lg text-base">
                                        <button
                                            onClick={() => toggle(ticket)}
                                            className=" mt-1 cursor-pointer">
                                            <Info className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
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
        </div>
    );
};
