import { Box, forwardRef, Input } from "@chakra-ui/react";

interface Props {
    label: string;
    type: "email" | "password" | "text";
    placeholder?: string;
    isInvalid?: boolean;
}

export default forwardRef<Props, "div">(({ label, ...props }, ref) => {
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
                ref={ref}
                rounded="none"
                w="100%"
                pl={0}
                pr="1rem"
                variant="unstyled"
                {...props}
            />
        </Box>
    );
});
