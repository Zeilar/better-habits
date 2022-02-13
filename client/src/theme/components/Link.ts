import { StyleConfig } from "@chakra-ui/theme-tools";

export const Link: StyleConfig = {
    baseStyle: {
        fontWeight: 600,
        transition: "none",
        color: "primary.400",
        _focus: {
            boxShadow: "none",
        },
        _hover: {
            color: "primary.200",
            textDecor: "none",
        },
    },
};
