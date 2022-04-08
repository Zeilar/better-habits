import { StyleConfig } from "@chakra-ui/theme-tools";

export const Accordion: StyleConfig = {
    variants: {
        outline: {
            container: {
                border: 0,
            },
            button: {
                p: 0,
                _hover: {
                    bgColor: "transparent",
                },
                _focus: {
                    boxShadow: "none",
                },
            },
            panel: {
                px: 0,
                pb: 0,
                pt: 2,
            },
        },
    },
};
