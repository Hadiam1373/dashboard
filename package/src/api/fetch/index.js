import axios from "axios";
import {socketUrl, accessToken} from "@/api/fetch/config";

export const fetch = axios.create({
    // timeout: 1000,
    baseURL: socketUrl,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        Authorization: accessToken
    },
})
