import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme/index";
import { AuthContextProvider } from "../contexts/AuthContext";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider>
            <ChakraProvider theme={theme}>
                <CSSReset />
                <AuthContextProvider>
                    <Component {...pageProps} />
                </AuthContextProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}
