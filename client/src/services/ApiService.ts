import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export interface ErrorResponse {
    error: string;
    message: string;
    statusCode: number;
}

export interface Response<T> extends AxiosResponse<T> {
    ok: boolean;
}

export class ApiService {
    public async request<T>(url: string, config?: AxiosRequestConfig) {
        try {
            const response: AxiosResponse<T> = await axios({
                url,
                withCredentials: true,
                ...config,
            });
            return { ...response, ok: true } as const;
        } catch (error) {
            const response: AxiosResponse<ErrorResponse> = error.response;
            return { ...response, ok: false } as const;
        }
    }
}
