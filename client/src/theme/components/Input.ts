import { StyleConfig } from "@chakra-ui/theme-tools";

export const Input: StyleConfig = {
    variants: {
        filled: {
            field: {
                bgColor: "gray.800",
                _hover: {
                    bgColor: "gray.700",
                },
                _focus: {
                    borderColor: "cyan.main",
                    boxShadow: "none",
                    bgColor: "gray.700",
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
                    borderBottomColor: "cyan.main",
                },
                _focus: {
                    borderBottomColor: "cyan.main",
                    boxShadow: "0 1px 0 0 var(--chakra-colors-cyan-main)",
                },
                _invalid: {
                    borderBottomColor: "danger",
                    boxShadow: "0 1px 0 0 var(--chakra-colors-danger)",
                },
            },
        },
    },
};
