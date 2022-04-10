import { StyleConfig } from "@chakra-ui/theme-tools";

export const Checkbox: StyleConfig = {
    baseStyle: {
        _focus: {
            outlineWidth: 2,
            outlineColor: "cyan.400",
        },
    },
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
