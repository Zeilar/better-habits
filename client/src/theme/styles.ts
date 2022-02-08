export const styles = {
    global: {
        "::selection": {
            color: "primary.200",
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
            // "::-webkit-scrollbar-thumb": {
            //     backgroundColor: "brand.default",
            //     backgroundClip: "padding-box",
            //     border: "4px solid transparent",
            //     borderRadius: 100,
            // },
        },
        "img, svg, ::placeholder": {
            userSelect: "none",
        },
        "::-webkit-scrollbar": {
            w: "1.2rem",
        },
        "::-webkit-scrollbar-thumb": {
            bgClip: "padding-box",
            border: "4px solid transparent",
            bgColor: "brand.default",
            borderRadius: 100,
        },
        "::-webkit-scrollbar-track": {
            bgColor: "gray.900",
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
