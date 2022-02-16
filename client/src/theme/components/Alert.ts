import { StyleConfig } from "@chakra-ui/theme-tools";
import { AlertProps } from "@chakra-ui/react";

export const Alert: StyleConfig = {
    variants: {
        // @ts-ignore
        solid: (props: AlertProps) => {
            const container = {
                color: "text.default",
                bgColor: "gray.400",
            };
            switch (props.status) {
                case "info":
                    return {
                        container,
                        icon: {
                            color: "blue.400",
                        },
                    };
                case "warning":
                    return {
                        container,
                        icon: {
                            color: "yellow.400",
                        },
                    };
                case "error":
                    return {
                        container,
                        icon: {
                            color: "red.400",
                        },
                    };
                case "success":
                    return {
                        container,
                        icon: {
                            color: "primary.600",
                        },
                    };
            }
        },
    },
};
