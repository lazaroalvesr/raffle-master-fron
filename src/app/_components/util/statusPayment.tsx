import { InfoPaymentText } from '@/lib/infoPaymentText';

export const StatusPayment = ({ infoPayment }: { infoPayment: string | undefined }) => {
    return (
        <button
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${infoPayment === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : infoPayment === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                }` }>
                <InfoPaymentText infoPayment={infoPayment || ""} />
        </button >
    );
};
