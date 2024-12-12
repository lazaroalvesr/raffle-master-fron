/* eslint-disable */

import axios from 'axios';
import { BaseURL } from "@/app/api/api";

async function getRaffles() {
    try {
        const response = await axios.get(`${BaseURL}raffle/getAll`, {
            headers: { 
                accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export default getRaffles;
