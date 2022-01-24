import { StyleConfig } from "@chakra-ui/theme-tools";

export const Link: StyleConfig = {
    baseStyle: {
        color: "primary.400",
        _focus: {
            boxShadow: "none",
        },
        _hover: {
            textDecor: "underline",
        },
    },
};
