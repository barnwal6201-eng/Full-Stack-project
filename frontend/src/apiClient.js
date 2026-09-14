import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE;

const apiClient = axios.create({
    baseURL: API_BASE,
    headers: 
})