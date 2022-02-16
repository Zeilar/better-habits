import { StyleConfig } from "@chakra-ui/theme-tools";

export const Link: StyleConfig = {
    baseStyle: {
        fontWeight: 600,
        transition: "none",
        _focus: {
            boxShadow: "none",
        },
        _hover: {
            textDecor: "none",
        },
    },
};
