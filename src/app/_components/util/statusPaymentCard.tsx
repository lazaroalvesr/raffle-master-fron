import { InfoPaymentText } from '@/lib/infoPaymentText';

export const StatusPaymentCard = ({ infoPayment }: { infoPayment: string | undefined }) => {
    return (
        <button
            className={`text-white w-32 rounded-md text-center text-lg cursor-auto ${
                infoPayment === "pending" ? "bg-orange-500" :
                infoPayment === "approved" ? "bg-green-500" :
                    infoPayment === "cancelled" ? "bg-red-500" :
                        ""
                }`}>
            <InfoPaymentText infoPayment={infoPayment || ""} />
        </button>
    );
};
