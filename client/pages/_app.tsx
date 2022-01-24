import { Box, ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme/index";
import { DependencyContextProvider } from "../contexts/DependencyContext";
import { AuthContextProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <DependencyContextProvider>
                <AuthContextProvider>
                    <Box maxW="50rem" h="100%" mx="auto">
                        <Component {...pageProps} />
                    </Box>
                </AuthContextProvider>
            </DependencyContextProvider>
        </ChakraProvider>
    );
}
