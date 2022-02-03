import { withDefaultSize, withDefaultVariant } from "@chakra-ui/react";

export const withDefaults = [
    withDefaultVariant({
        variant: "filled",
        components: ["Textarea", "Select", "Checkbox", "Switch", "Input"],
    }),
    withDefaultVariant({
        variant: "primary",
        components: ["Button"],
    }),
    withDefaultSize({
        size: "md",
        components: ["Button", "Checkbox"],
    }),
];
