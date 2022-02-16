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
            bgColor: "body",
            color: "text.default",
        },
        "#__next": {
            minH: "100vh !important", // Need !important due to Chakra default styling
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
