export const InfoPaymentText = ({ infoPayment }: { infoPayment: string }) => {
    const text = infoPayment === 'pending' ? "Pendente" :
        infoPayment === 'approved' ? "Aprovado" :
            infoPayment === 'cancelled' ? "Cancelado" :
                "";

    return text;
}