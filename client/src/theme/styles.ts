import { hero } from "../assets/images";

export const styles = {
    global: {
        "::selection": {
            color: "body",
            bgColor: "primary.600",
        },
        "*, *::before, *::after": {
            borderColor: "border.default",
        },
        body: {
            minH: "100vh",
            bgColor: "body",
            color: "text.default",
            bgImg: hero,
            bgSize: "cover",
            bgPos: "center",
        },
        "img, svg, ::placeholder": {
            userSelect: "none",
        },
        ".chakra-toast__inner": {
            ".chakra-alert": {
                '> button[aria-label="Close"]': {
                    _focus: {
                        boxShadow: "none",
                    },
                },
            },
        },
        "fieldset, legend": {
            all: "revert",
        },
    },
};
