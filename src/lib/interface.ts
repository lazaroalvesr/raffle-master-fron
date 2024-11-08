/* eslint-disable */

import { ReactNode } from "react";

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
    raffle: {
        id: string;
        name: string;
        description: string;
        image: string
        startDate: string;
        endDate: string;
        quantityNumbers: string;
        ticketPrice: string;
    }
    availableTickets: string;
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
    quantityNumbers: number
    endDate: string | undefined
}

export interface BuyCardProps extends Partial<InfosCardProps> {
    onClick?: () => void;
    quantityNumbers: number
    handleSubmit: (quantity: number) => void;
    successMessage: string | null;
    errorMessage: string | null;
    loading: boolean;
}

export interface DescriptionCardProps extends Partial<InfosCardProps> { }

export interface ButtonCardBuyProps {
    number: string;
    onClick?: () => void;
    loading?: boolean;
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
    email: string | undefined
}

export interface InfoPaymentProps {
    nameRafle: string
    namePayer: string | any
    infoPayment: string | any
    infoDateBuy?: Date;
    paymentMethod: "PIX"
    numTickets: number[] | any
    pixLink: string
    close: () => void
}

export interface Ticket {
    nameRafle: string
    infosName?: string;
    infoPayment?: string;
    infoDateBuy?: Date;
    infoNamePayer?: string;
    infoAmout: number;
    ticketNumbers?: number[];
    pixLink: string;
}

export interface TableProps {
    tickets?: Ticket[];
}

export interface StatusPaymentCardProps {
    infoPayment: string | undefined
}

export interface Props {
    children: ReactNode
}

export interface Raffles {
    name: string
}

export interface Tickets {
    name: string
}

export interface Payment {
    name: string
}


export type TUser = {
    id: string;
    name: string
    email: string;
    surname: string
    telephone: string
    role: Role
    access_token: string
    raffles: Raffles[]
    tickets: Tickets[]
    Payment: Payment[]
};

export type AuthUser = {
    token: string;
    user: TUser;
};

export interface TAuthContext {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void
}

export interface NavLinkProps {
    href: string
    children: React.ReactNode
}

export interface dataProps{
    name?: string
    surname?: string
    email?: string,
    telephone?: string
}