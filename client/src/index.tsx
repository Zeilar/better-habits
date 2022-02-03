import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "./theme";
import { AuthContextProvider } from "./contexts/AuthContext";

ReactDOM.render(
    <BrowserRouter>
        <ChakraProvider theme={theme}>
            <CSSReset />
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
