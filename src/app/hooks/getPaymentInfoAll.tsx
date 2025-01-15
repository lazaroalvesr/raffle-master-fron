/* eslint-disable */

import axios from 'axios';
import { BaseURL } from "../api/api";
import Cookies from "js-cookie";

async function getPaymentInfoAll(searchUser: string) {
    const token = Cookies.get("token");

    try {
        const response = await axios.get(`${BaseURL}payment/getPaymentInfoAll`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            params: {
                payerEmail: searchUser
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export default getPaymentInfoAll;
