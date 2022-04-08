import { StyleConfig, transparentize } from "@chakra-ui/theme-tools";
import { AlertProps } from "@chakra-ui/react";
import theme from "..";

export const Alert: StyleConfig = {
    variants: {
        // @ts-ignore
        solid: (props: AlertProps) => {
            // @ts-ignore
            const _theme: typeof theme = props.theme;
            const container = {
                color: "text.default.main",
                bgColor: "gray.800",
                overflow: "visible",
                px: 6,
                pr: 6,
                borderWidth: 2,
                boxShadow: _theme.shadows.card,
            };
            switch (props.status) {
                case "info":
                    return {
                        container: {
                            ...container,
                            borderColor: "blue.400",
                        },
                        icon: {
                            color: "blue.400",
                        },
                    };
                case "warning":
                    return {
                        container: {
                            ...container,
                            borderColor: "yello.400",
                        },
                        icon: {
                            color: "yellow.400",
                        },
                    };
                case "error":
                    return {
                        container: {
                            ...container,
                            borderColor: "error",
                        },
                        icon: {
                            color: "red.400",
                        },
                    };
                case "success":
                    return {
                        container: {
                            ...container,
                            borderColor: "success",
                        },
                        icon: {
                            color: "success",
                        },
                    };
            }
        },
        border: {
            container: {
                py: 1,
                rounded: "md",
                border: "2px solid",
                borderColor: "red.700",
                bgColor: transparentize("red.500", 0.25),
            },
        },
    },
};
