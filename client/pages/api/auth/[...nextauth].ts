import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiService } from "../../../services";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "john@example.net",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            authorize: async (credentials, req) => {
                const { data, ok } = await apiService.request("/auth/login", {
                    method: "POST",
                    data: credentials,
                });
                console.log({ data, ok });
                return data as object;
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            if (token) {
                session.user = token;
            }
            return session;
        },
    },
});
