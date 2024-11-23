'use client';

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { configureAxiosCSRF } from '../_components/util/axiosConfig';

interface CSRFContextType {
    csrfToken: string | null;
}

const CSRFContext = createContext<CSRFContextType>({ csrfToken: null });

export const CSRFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState<string | null>(null);
const token = Cookies.get("token")

    useEffect(() => {
        const fetchCSRFToken = async () => {
            try {
                await axios.get('https://tecnewsbr.com.br/csrf/token', {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                const xsrfToken = Cookies.get('XSRF-TOKEN');
                if (xsrfToken) {
                    setCsrfToken(xsrfToken);
                }
            } catch (error) {
                console.error('Erro ao buscar token CSRF', error);
            }
        };

        fetchCSRFToken();
    }, []);

    useEffect(() => {
        configureAxiosCSRF(csrfToken);
    }, [csrfToken]);

    return (
        <CSRFContext.Provider value={{ csrfToken }}>
            {children}
        </CSRFContext.Provider>
    );
};
