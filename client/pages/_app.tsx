import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme/index";
import { AuthContextProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <AuthContextProvider>
                <Component {...pageProps} />
            </AuthContextProvider>
        </ChakraProvider>
    );
}
