/* eslint-disable */

import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
    exp?: number;
    sub?: string;
    email?: string;
    roles?: string[];
}

interface TokenStatus {
    valido: boolean;
    expirando?: boolean;
    motivo?: string;
    payload?: JWTPayload;
}

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";
const DASHBOARD_URL = "/dashboard";
const TOKEN_EXPIRING_THRESHOLD = 300;

const PROTECTED_ROUTES = [
    DASHBOARD_URL,
    `${DASHBOARD_URL}/meus_bilhetes`,
];

const AUTH_ROUTES = [
    LOGIN_URL,
    REGISTER_URL,
];

function verificaToken(token: string): TokenStatus {
    try {
        const decoded = jwtDecode(token) as JWTPayload;
        const agora = Math.floor(Date.now() / 1000);

        if (!decoded.exp) {
            return {
                valido: false,
                motivo: 'Token não possui data de expiração'
            };
        }

        if (decoded.exp < agora) {
            return {
                valido: false,
                motivo: 'Token expirado',
                payload: decoded
            };
        }

        return {
            valido: true,
            expirando: (decoded.exp - agora) < TOKEN_EXPIRING_THRESHOLD,
            payload: decoded
        };
    } catch (error) {
        return {
            valido: false,
            motivo: 'Token inválido ou mal formatado'
        };
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    
    const isProtectedRoute = PROTECTED_ROUTES.some(route => 
        request.nextUrl.pathname.startsWith(route)
    );
    const isAuthRoute = AUTH_ROUTES.some(route => 
        request.nextUrl.pathname === route
    );

    if (isProtectedRoute) {
        if (!token) {
            const loginUrl = new URL(LOGIN_URL, request.url);
            loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        const tokenStatus = verificaToken(token);

        if (!tokenStatus.valido) {
            const loginUrl = new URL(LOGIN_URL, request.url);
            loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete("token");
            return response;
        }

        if (tokenStatus.expirando) {
            const response = NextResponse.next();
            response.headers.set('X-Token-Expiring', 'true');
            return response;
        }

        return NextResponse.next();
    }

    if (isAuthRoute && token) {
        const tokenStatus = verificaToken(token);
        
        if (tokenStatus.valido) {
            return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
        } else {
            const response = NextResponse.next();
            response.cookies.delete("token");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ]
};