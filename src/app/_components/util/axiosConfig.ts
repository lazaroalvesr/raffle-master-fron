'use client';

import axios from 'axios';
import Cookies from 'js-cookie';

export const configureAxiosCSRF = (csrfToken: string | null) => {
    axios.interceptors.request.use(
        config => {
            const token = Cookies.get('token');
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            
            if (csrfToken) {
                config.headers['X-CSRF-Token'] = csrfToken; // Correspondente ao backend
            }

            return config;
        },
        error => Promise.reject(error)
    );
};
