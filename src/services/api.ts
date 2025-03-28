import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API ბაზის მისამართი
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ინტერფეისი API მოთხოვნების კონფიგურაციისთვის
interface ApiRequestConfig extends AxiosRequestConfig {
    secure?: boolean;
}

class Api {
    private instance: AxiosInstance;
    private token: string | null = null;

    constructor() {
        this.instance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // ინტერცეპტორები
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        // მოთხოვნის ინტერცეპტორი
        this.instance.interceptors.request.use(
            (config) => {
                if (this.token) {
                    config.headers.Authorization = `Bearer ${this.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // პასუხის ინტერცეპტორი
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // არაავტორიზებული - წაშალე ტოკენი
                    this.clearToken();
                    // გადამისამართება ლოგინზე თუ საჭიროა
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    // ტოკენის დაყენება ავტორიზაციისთვის
    public setToken(token: string): void {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    // ტოკენის წაშლა
    public clearToken(): void {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    // მოთხოვნის მეთოდები
    public async get<T = any>(
        url: string,
        config?: ApiRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.instance.get<T>(url, config);
    }

    public async post<T = any>(
        url: string,
        data?: any,
        config?: ApiRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data, config);
    }

    public async put<T = any>(
        url: string,
        data?: any,
        config?: ApiRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(url, data, config);
    }

    public async delete<T = any>(
        url: string,
        config?: ApiRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(url, config);
    }
}

// ექსპორტი
export default new Api();