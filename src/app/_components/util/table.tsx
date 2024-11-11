import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { StatusPayment } from "./statusPayment";
import PaymentInfoCard from "./card";
import { formatCurrency } from "@/lib/formatCurrency ";
import { TableProps, Ticket } from "@/lib/interface";

export const Table = ({ tickets = [] }: TableProps) => {
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
        <div className="border rounded-md flex mx-3">
            <div className="lg:w-[1110px] w-full md:w-[825px] flex overflow-x-scroll lg:overflow-visible relative">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[17px] bg-gray-100 h-12 lg:h-auto">
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left">Nome</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell">Status Pagamento</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell">Data da compra</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left hidden lg:table-cell md:table-cell">Valor</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left ">Informações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 w-60 lg:text-lg text-base overflow-hidden truncate">
                                        <p className="lg:w-96 w-40truncate">{ticket.infosName || "Nome não disponível"}</p>
                                    </td>
                                    <td className="px-4 py-2  hidden lg:table-cell md:table-cell">
                                        <StatusPayment infoPayment={ticket.infoPayment} />
                                    </td>
                                    <td className="px-4 py-2  text-lg  hidden lg:table-cell">
                                        {ticket.infoDateBuy ? formatDate(ticket.infoDateBuy) : "Data não disponível"}
                                    </td>
                                    <td className="px-4 py-2  text-lg hidden lg:table-cell">
                                        {ticket.infoAmout ? formatCurrency(ticket.infoAmout) : "Valor não disponível"}
                                    </td>
                                    <td className="px-4 py-2 lg:text-lg text-base">
                                        <button
                                            onClick={() => toggle(ticket)}
                                            className="border mt-1 border-black cursor-pointer rounded-[10px] text-center w-40 py-1 lg:w-[178px]">
                                            Ver Informações
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
