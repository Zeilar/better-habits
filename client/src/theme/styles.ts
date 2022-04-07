export const styles = {
    global: {
        "::selection": {
            color: "text.default.contrast",
            bgColor: "cyan.main",
        },
        "*, *::before, *::after": {
            borderColor: "border.default",
        },
        body: {
            minH: "100vh",
            bgColor: "gray.900",
            color: "text.default.main",
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
