import { createContext, useEffect, useState } from "react";
import { User } from "../../@types/user";
import { apiService } from "../services";
import { Response, ErrorResponse } from "../services/ApiService";
import PageSpinner from "../components/PageSpinner";
import { useToast } from "../hooks";

interface IAuthContext {
    user: User | null;
    setUser: React.Dispatch<User>;
    login(payload: LoginOrRegisterPayload): Promise<Response<ErrorResponse> | Response<User>>;
    register(payload: LoginOrRegisterPayload): Promise<Response<ErrorResponse> | Response<User>>;
    logout(): Promise<void>;
    authenticated: boolean;
}

interface AuthProps {
    children: React.ReactNode;
}

interface LoginOrRegisterPayload {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({ children }: AuthProps) {
    const toast = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        whoami();
    }, []);

    async function whoami() {
        const response = await apiService.request<User>("/auth/whoami");
        if (response.ok) {
            setUser(response.data);
        }
        setLoading(false);
    }

    async function login(payload: LoginOrRegisterPayload) {
        const response = await apiService.request<User>("/auth/login", {
            method: "POST",
            data: { ...payload },
        });
        if (response.ok) {
            setUser(response.data);
            toast({ title: "Logged in", status: "success" });
        }
        return response;
    }

    async function register(payload: LoginOrRegisterPayload) {
        const response = await apiService.request<User>("/auth/register", {
            data: payload,
            method: "POST",
        });
        if (response.ok) {
            setUser(response.data);
            toast({ title: "Created your account!", status: "success" });
        }
        return response;
    }

    async function logout() {
        const response = await apiService.request("/auth/logout");
        if (response.ok) {
            setUser(null);
            toast({ title: "Logged out", status: "success" });
        } else {
            toast({ title: "Failed logging out", status: "error" });
        }
    }

    const values: IAuthContext = {
        user,
        login,
        setUser,
        logout,
        register,
        authenticated: Boolean(user),
    };

    if (loading) {
        return <PageSpinner />;
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
