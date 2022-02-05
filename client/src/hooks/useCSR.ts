import { useState, useEffect } from "react";
import { apiService } from "../services";
import { AxiosRequestConfig } from "axios";
import { isEqual } from "lodash";

type Status = "loading" | "error" | "success";
type Config = AxiosRequestConfig | undefined;

export function useCSR<T>(url: string, config?: Config) {
    const [data, setData] = useState<T | null | undefined>();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<Status>("loading");
    const [memoConfig, setMemoConfig] = useState<Config>(config);

    useEffect(() => {
        if (!isEqual(memoConfig, config)) {
            setMemoConfig(config);
        }
    }, [config, memoConfig]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await apiService.request<T>(url, memoConfig);
            if (response.ok) {
                setData(response.data);
            }
            setStatus(response.ok ? "success" : "error");
            setLoading(false);
        })();
    }, [url, memoConfig]);

    return {
        data: data as T,
        loading,
        status,
        success: status === "success",
        error: status === "error",
    } as const;
}
