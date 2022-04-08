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
                "box-shadow": _theme.shadows.card, // Need both keys for some reason
            };
            const icon = {
                transform: "translateY(-50%) translateX(-50%)",
                pos: "absolute",
                top: "50%",
                w: 5,
                h: 5,
                left: 0,
                _after: {
                    content: `""`,
                    pos: "absolute",
                    w: "100%",
                    h: "100%",
                    bgColor: "gray.800",
                    rounded: "full",
                    zIndex: -1,
                },
            };
            const title = {
                mr: 0,
            };
            switch (props.status) {
                case "info":
                    return {
                        title,
                        container: {
                            ...container,
                            borderColor: "blue.400",
                        },
                        icon: {
                            ...icon,
                            color: "blue.400",
                        },
                    };
                case "warning":
                    return {
                        title,
                        container: {
                            ...container,
                            borderColor: "yello.400",
                        },
                        icon: {
                            ...icon,
                            color: "yellow.400",
                        },
                    };
                case "error":
                    return {
                        title,
                        container: {
                            ...container,
                            borderColor: "error",
                        },
                        icon: {
                            ...icon,
                            color: "red.400",
                        },
                    };
                case "success":
                    return {
                        title,
                        container: {
                            ...container,
                            borderColor: "success",
                        },
                        icon: {
                            ...icon,
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
