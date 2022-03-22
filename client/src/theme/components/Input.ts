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
        flushed: {
            field: {
                height: "auto",
                py: 2,
                _hover: {
                    borderBottomColor: "primary.600",
                },
                _focus: {
                    borderBottomColor: "primary.600",
                    boxShadow: "0 1px 0 0 var(--chakra-colors-primary-600)",
                },
                _invalid: {
                    borderBottomColor: "danger",
                    boxShadow: "0 1px 0 0 var(--chakra-colors-danger)",
                },
            },
        },
    },
};
