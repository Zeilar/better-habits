import { forwardRef } from "@chakra-ui/system";
import { Box } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";

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
            rounded="lg"
            pl={4}
            pb={2}
            textTransform="capitalize"
            borderColor={props.isInvalid ? "danger" : "border.default"}
            _focusWithin={{ borderColor: "cyan.main" }}
        >
            <Box as="legend">{label}</Box>
            <Input ref={ref} rounded="none" w="100%" pl={0} pr={4} variant="unstyled" {...props} />
        </Box>
    );
});
