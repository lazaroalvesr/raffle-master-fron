import axios from 'axios';
import { BaseURL } from "../api/api";
import Cookies from "js-cookie";

async function getInfoPaymentRaffle({ selectedRaffle }: { selectedRaffle: string }) {
    const token = Cookies.get("token");

    try {
        const response = await axios.get(`${BaseURL}raffle/getInfoPaymentRaffle/${selectedRaffle}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export default getInfoPaymentRaffle;
