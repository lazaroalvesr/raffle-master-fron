/* eslint-disable */

import { ReactNode } from "react";

export interface CardRaffleProps {
    src: string
    href: string
    text: string
    description: string;
    quantityNumbers: string;
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
        winnerTicketId: string | undefined
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
    ticketPrice: string | any
    quantityNumbers: number | any
    endDate: string | Date | undefined;
    winnerTicketId: string | undefined
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
    surname: string;
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
    ticketPrice: string | any
    amount: number
    pixKey: string
    closeSuccessModal?: () => void
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
    pixKey: string
    raffle: RaffleProps
    ticketNumbers: number[]
    user: {
        name: string
    }
}

export interface UserNavProps {
    name: string | undefined
    email: string | undefined
    isAdm: boolean
}

export interface InfoPaymentProps {
    nameRafle: string
    namePayer: string | any
    infoPayment: string | any
    infoDateBuy?: Date;
    paymentMethod: "PIX"
    numTickets: number[] | any
    pixLink: string
    pixKey: string
    close: () => void
}

export interface TicketInterface {
    id: string
    nameRafle: string
    infosName?: string;
    infoPayment?: string;
    infoDateBuy?: Date;
    infoNamePayer?: string;
    infoAmout: number;
    ticketNumbers?: number[];
    pixLink: string;
    pixKey: string;
}

export interface TableProps {
    tickets?: TicketInterface[];
}


export interface WinnerTicket {
    id: string;
    number: number[];
    userId: string;
    raffleId: string;
    dateBuy: string;
}

export interface WonRaffle {
    name: string;
    winnerTicket: WinnerTicket;
    drawDate: string;
    startDate: string;
    ticketPrice: string;
}

export interface Ticket {
    id: string;
    number: number[];
    userId: string;
    raffleId: string;
    dateBuy: string;
    wonRaffles: WonRaffle[];
    close: () => void
}

export interface ApiResponse {
    tickets: Ticket[];
}
export interface StatusPaymentCardProps {
    infoPayment: string | undefined
}

export interface Props {
    children: ReactNode
}

export type TUser = {
    id: string;
    name: string
    email: string;
    surname: string
    telephone: string
    role: Role
    access_token: string

};

export interface AuthUser {
    token: string;
    user: TUser;
};

export interface NavLinkProps {
    href: string
    children: React.ReactNode
}

export interface dataProps {
    name?: string
    surname?: string
    email?: string,
    telephone?: string
}

export interface TAuthContext {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    updateUser: (userData: Partial<AuthUser['user']>) => void;
}

export interface SidebarProps {
    ativo: boolean
    setAtivo: (ativo: boolean) => void
}

export interface Rafle {
    id: string
    image: string
    name: string
    description: string
    quantityNumbers: string;
}

export interface RaffleSelect {
    id: string
    name: string
}

export interface RaffleUniqueADM {
    id: string
    name: string;
    endDate: string | any;
    ticketPrice: string;
    availableTickets: number;
    quantityNumbers: number;
    description?: string | any
    winnerTicketId: string | undefined
    winner: {
        email: string
        name: string
        telephone: string,
    }

    onDelete: (id: string) => Promise<void>;
    drawWinner: (id: string) => Promise<void>
}

export interface RaffleUniqueEdit {
    id: string
    name: string;
    endDate: string | any;
    ticketPrice: string;
    quantityNumbers: number;
    image: null | File
    description?: string | any
}

export interface InfoRaffleProps {
    id: string
    name: string;
    quantityNumbers: number;
    endDate: string | any;
    availableTickets: number;
    ticketPrice: string;
    winnerTicketId: string
    close: () => void
    openModalInfoWinner: (id: string) => Promise<void>
    isRaffleActive: (endDate: string, winnerTicketId: string) => boolean;
    onClick: () => void;
    winner: (raffleId: string) => void
    drawWinner: (id: string) => Promise<void>
}

interface RafflePaymentInfo {
    name: string
    user: {
        name: string
        telephone: string
    }
    tickets: {
        number: number[]
        dateBuy: Date
    }[]
}

export interface PaymentInfoAllProps {
    id: string
    amount: number
    payerEmail: string
    status: "approved" | "cancelled" | "pending" | "rejected";
    ticketNumbers: number[],
    createdAt: Date,
    raffle: RafflePaymentInfo
}

export interface InfoCardReportProps extends Partial<Omit<PaymentInfoAllProps, 'ticketNumbers, raffle'>> {
    raffle: RafflePaymentInfo
    ticketNumbers: number[]
    close?: () => void
}


export interface RaffleInfoPaymento {
    user: {
        email: string
    },
    name: string
    status: StatusPayment | any
    createdAt: string
    ticketNumbersCount: number
    amount: number
}

export interface User {
    name: string,
    surname: string,
    email: string,
    role: Role,
    telephone: string,
}

export interface UserResponse {
    count: number;
    user: User[]
}

export interface InfoUserAllCardProps extends Partial<User> {
    close: () => void
}

export interface InfoRaffleCardProps extends Partial<RaffleInfoPaymento> {
    close: () => void
}

export interface RaffleCreate {
    name: string
    description: string
    quantityNumbers: string
    ticketPrice: string
    startDate: Date
    endDate: Date
    image: null | File
}

export interface TruncatedTextProps {
    text: string;
    className?: string;
}

export interface DrawWinnerTicketResponse {
    message: string;
    winner: {
        ticket: {
            id: string
            number: number[],
            dateBuy: Date,
        }
        user: {
            name: string
            email: string
            telephone: string
        },
        drawDate: Date
    }
}

export interface WinnerInfosProps {
    raffle: {
        winnerTicket: {
            number: number[]
            user: {
                email: string
                name: string
                telephone: string,
            }
        }
        drawDate: string
    }
}

export interface DranwWinnerProps {
    name: string
    number: number[]
    email: string
    telephone: string
    close?: () => void
}

export interface InfoWinnerProps {
    name: string
    number: number[]
    email: string
    telephone: string
    drawDate: string
    close?: () => void
}

export interface TableRifasAdmProps {
    raffles: RaffleUniqueADM[];
    onDelete: (raffleId: string) => void;
    onEdit: (raffleId: string, updatedRaffle: RaffleUniqueEdit) => void;
    drawWinner: (raffleId: string) => void
    winner: (raffleId: string) => void
}

export interface useResponsiveItemsPerPageProps {
    itemsTablet: number
    itemsDefault: number
}

export interface paginationProps {
    handlePrevPage: () => void
    currentPage: number;
    totalPages: number;
    handleNextPage: () => void
    setCurrentPage: (page: number) => void;
}