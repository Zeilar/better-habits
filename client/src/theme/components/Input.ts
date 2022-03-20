import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
    variants: {
        filled: {
            field: {
                bgColor: "gray.400",
                _hover: {
                    bgColor: "gray.400",
                },
                _focus: {
                    borderColor: "primary.600",
                    boxShadow: "none",
                    bgColor: "gray.400",
                },
                _invalid: {
                    borderColor: "danger",
                    boxShadow: "none",
                },
            },
        },
    },
};
