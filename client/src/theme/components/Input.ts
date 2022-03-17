import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
    variants: {
        filled: {
            field: {
                bgColor: "gray.600",
                _hover: {
                    bgColor: "gray.600",
                },
                _focus: {
                    borderColor: "primary.600",
                    boxShadow: "none",
                    bgColor: "gray.600",
                },
                _invalid: {
                    borderColor: "danger",
                    boxShadow: "none",
                },
            },
        },
    },
};
