export interface CardRaffleProps {
    src: string
    href: string
    text: string
}

export interface RaffleProps {
    id: string;
    name: string;
    description: string;
    image: string
}

export interface RaffleUniqueProps {
    id: string;
    name: string;
    description: string;
    image: string
    startDate: string;
    endDate: string;
    quantityNumbers: string;
    availableTickets: string;
    ticketPrice: string;
}

export interface CalendarProps {
    text: string | any
}

export interface TicketProps {
    number: string
}

export interface InfosCardProps {
    title: string
    ticketPrice: string | any
    quantityNumbers: string | undefined
    endDate: string | undefined
}

export interface BuyCardProps extends Partial<InfosCardProps> {
    onClick?: () => void;
    quantityNumbers: number | any
    handleSubmit: (quantity: number) => void;
    successMessage: string | null
    errorMessage: string | null
    loading: boolean
}

export interface DescriptionCardProps extends Partial<InfosCardProps> { }

export interface ButtonCardBuyProps {
    onClick: () => void
    number: string
    loading: boolean
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegisterProps {
    name: string;
    email: string;
    telephone: string;
    password: string;
}

export enum Role {
    USER = 'USER',
    ADM = 'ADM',
}

export interface PurchaseBuyCardProps {
    quantity: number
    pixLink: string | any
    qrCode: string
    amount: number
}

export interface TicketsProps {
    id: string,
    number: number,
    userId: string
    raffleId: string
    _count: {
        tickets: number
        Payment: boolean
    }
}

export enum StatusPayment {
    PENDENTE,
    CANCELADO,
    APROVADO
}

export interface RaffleProps {
    name: string
    _count: {
        tickets: number
        payment: number
    }
}

export interface UserRaffleProps {
    id: string
    amount: number | any
    paymentMethod: "pix"
    status: StatusPayment | any
    createdAt: Date
    pixUrl: string | any
    raffle: RaffleProps
    ticketNumbers: number[]
    user: {
        name: string
    }
}

export interface UserNavProps {
    name: string | undefined
    email: string| undefined
}