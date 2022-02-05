import { StyleConfig } from "@chakra-ui/theme-tools";

export const Link: StyleConfig = {
    baseStyle: {
        fontWeight: 600,
        _focus: {
            boxShadow: "none",
        },
        _hover: {
            textDecor: "none",
            color: "primary.400",
        },
    },
};
