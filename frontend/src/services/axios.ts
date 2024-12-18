"use client";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const config = {
    baseURL: `${apiUrl}`,
    withCredentials: true, // Ensure cookies are sent with requests
};

const axiosInstance = axios.create(config);

export default axiosInstance;
