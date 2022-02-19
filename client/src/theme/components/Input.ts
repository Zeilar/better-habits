import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
    variants: {
        filled: {
            field: {
                bgColor: "gray.500",
                _focus: {
                    borderColor: "primary.600",
                    boxShadow: "none",
                },
                _invalid: {
                    borderColor: "danger",
                    boxShadow: "none",
                },
            },
        },
    },
};
