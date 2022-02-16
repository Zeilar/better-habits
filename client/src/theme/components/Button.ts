import { StyleConfig } from "@chakra-ui/theme-tools";

export const Button: StyleConfig = {
    baseStyle: {
        transitionDuration: "0.1s",
        rounded: "pill",
        color: "white",
        pos: "relative",
        border: 0,
        _focus: {
            boxShadow: "none",
        },
        _disabled: {
            pointerEvents: "none",
        },
    },
    sizes: {
        md: {
            p: "1rem",
            fontSize: "1.1rem",
        },
        lg: {
            paddingX: "2.5rem",
            paddingY: "1.5rem",
            fontSize: "1.25rem",
        },
    },
    variants: {
        primary: {
            bgColor: "primary.600",
            color: "black",
        },
        secondary: {
            border: "2px solid",
            borderColor: "primary.600",
            color: "primary.600",
            _hover: {
                bgColor: "primary.600",
                color: "black",
            },
        },
        danger: {
            border: "2px solid",
            borderColor: "danger",
            color: "danger",
            _hover: {
                bgColor: "danger",
                color: "text.default",
            },
        },
        unstyled: {
            border: 0,
        },
        icon: {
            border: 0,
            padding: "0.75rem",
            paddingInline: "0.75rem",
        },
    },
};
