import { StyleConfig } from "@chakra-ui/theme-tools";

export const Link: StyleConfig = {
    baseStyle: {
        w: "fit-content",
        fontWeight: 600,
        transition: "none",
        color: "blue.500",
        _focus: {
            boxShadow: "none",
        },
        _hover: {
            color: "blue.400",
            textDecor: "none",
        },
    },
};
