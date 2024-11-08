import { InfoPaymentText } from '@/lib/infoPaymentText';
import { StatusPaymentCardProps } from '@/lib/interface';

export const StatusPaymentCard = ({ infoPayment }: StatusPaymentCardProps) => {
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
