import { StyleConfig } from "@chakra-ui/theme-tools";
import { AlertProps } from "@chakra-ui/react";

export const Alert: StyleConfig = {
    variants: {
        // @ts-ignore
        solid: (props: AlertProps) => {
            switch (props.status) {
                case "info":
                    return {
                        container: {
                            bgColor: "blue.400",
                        },
                        icon: {
                            color: "blue.900",
                        },
                    };
                case "warning":
                    return {
                        container: {
                            bgColor: "yellow.300",
                        },
                        icon: {
                            color: "yellow.800",
                        },
                    };
                case "error":
                    return {
                        container: {
                            bgColor: "danger",
                        },
                        icon: {
                            color: "red.800",
                        },
                    };
                case "success":
                    return {
                        container: {
                            color: "text.default",
                            bgColor: "primary.700",
                        },
                        icon: {
                            color: "primary.400",
                        },
                    };
            }
        },
    },
};
