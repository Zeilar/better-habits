import {
    FormErrorMessage,
    FormErrorMessageProps,
    Text,
} from "@chakra-ui/react";
import Icon from "./Icon";

interface Props extends FormErrorMessageProps {
    message: string;
}

export default function FormError({ message, ...props }: Props) {
    return (
        <FormErrorMessage {...props}>
            <Icon icon="mdiAlertCircle" mr={1} w={5} h={5} />
            <Text>{message}</Text>
        </FormErrorMessage>
    );
}
