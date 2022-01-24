import { Box, Input } from "@chakra-ui/react";

interface Props {
    label: string;
    type: "email" | "password" | "text";
    placeholder?: string;
    isInvalid?: boolean;
}

export default function Fieldset({ label, ...props }: Props) {
    return (
        <Box
            as="fieldset"
            rounded="md"
            pl="1rem"
            pb="0.5rem"
            textTransform="capitalize"
            borderColor={props.isInvalid ? "danger" : "border.default"}
            _focusWithin={{ borderColor: "primary.400" }}
        >
            <Box as="legend">{label}</Box>
            <Input
                rounded="none"
                w="100%"
                pl={0}
                pr="1rem"
                variant="unstyled"
                {...props}
            />
        </Box>
    );
}
