import { StyleConfig } from "@chakra-ui/theme-tools";

export const Checkbox: StyleConfig = {
    variants: {
        filled: {
            control: {
                _checked: {
                    bgColor: "cyan.main",
                    borderColor: "cyan.main",
                },
                _focus: {
                    boxShadow: "none",
                },
            },
        },
    },
};
