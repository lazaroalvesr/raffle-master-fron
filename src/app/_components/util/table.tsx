import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { StatusPayment } from "./statusPayment";
import PaymentInfoCard from "./card";
import { formatCurrency } from "@/lib/formatCurrency ";

interface Ticket {
    nameRafle: string
    infosName?: string;
    infoPayment?: string;
    infoDateBuy?: Date;
    infoNamePayer?: string;
    infoAmout: number;
    ticketNumbers?: number[];
    pixLink: string;
}

interface TableProps {
    tickets?: Ticket[];
}

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
        <div className="border rounded-md flex">
            <div className="w-full flex overflow-x-scroll lg:overflow-visible relative">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-[17px] bg-gray-100">
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left">Nome</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left">Status Pagamento</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left">Data da compra</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left">Valor</th>
                            <th scope="col" className="px-4 lg:py-2 h-4 text-left">Informações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length > 0 ? (
                            tickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 w-60 text-lg overflow-hidden truncate">
                                        <p className="lg:w-96 w-52 truncate">{ticket.infosName || "Nome não disponível"}</p>
                                    </td>
                                    <td className="px-4 py-2">
                                        <StatusPayment infoPayment={ticket.infoPayment} />
                                    </td>
                                    <td className="px-4 py-2 text-lg">
                                        {ticket.infoDateBuy ? formatDate(ticket.infoDateBuy) : "Data não disponível"}
                                    </td>
                                    <td className="px-4 py-2 text-lg">
                                        {ticket.infoAmout ? formatCurrency(ticket.infoAmout) : "Valor não disponível"}
                                    </td>
                                    <td className="px-4 py-2 text-lg">
                                        <button
                                            onClick={() => toggle(ticket)}
                                            className="border border-black cursor-pointer rounded-[10px] text-center w-[178px]">
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
