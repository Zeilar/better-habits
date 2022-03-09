import { StyleConfig } from "@chakra-ui/theme-tools";

export const Link: StyleConfig = {
    baseStyle: {
        fontWeight: 600,
        transition: "none",
        _focus: {
            boxShadow: "none",
        },
        _hover: {
            color: "primary.600",
            textDecor: "none",
        },
    },
};
