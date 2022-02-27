import { StyleConfig } from "@chakra-ui/theme-tools";

export const Checkbox: StyleConfig = {
    variants: {
        filled: {
            control: {
                _checked: {
                    bgColor: "primary.600",
                    borderColor: "primary.600",
                },
                _focus: {
                    boxShadow: "none",
                },
            },
        },
    },
};
