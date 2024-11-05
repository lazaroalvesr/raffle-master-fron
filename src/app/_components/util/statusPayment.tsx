import { InfoPaymentText } from '@/lib/infoPaymentText';

export const StatusPayment = ({ infoPayment }: { infoPayment: string | undefined }) => {
    return (
        <button
            className={`text-white w-40 cursor-auto rounded-[50px] text-center text-lg ${infoPayment === "pending" ? "bg-orange-500" :
                infoPayment === "approved" ? "bg-green-500" :
                    infoPayment === "cancelled" ? "bg-red-500" :
                        ""
                }`}>
            <InfoPaymentText infoPayment={infoPayment || ""} />
        </button>
    );
};
