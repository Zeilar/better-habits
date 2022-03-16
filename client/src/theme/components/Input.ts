import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
    variants: {
        filled: {
            field: {
                bgColor: "gray.700",
                _hover: {
                    bgColor: "gray.500",
                },
                _focus: {
                    borderColor: "primary.600",
                    boxShadow: "none",
                    bgColor: "gray.500",
                },
                _invalid: {
                    borderColor: "danger",
                    boxShadow: "none",
                },
            },
        },
    },
};
