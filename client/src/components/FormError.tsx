import { FormErrorMessage, FormErrorMessageProps } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { AlertCircleOutline } from "@styled-icons/evaicons-outline/AlertCircleOutline";
import Icon from "./Icon";

interface Props extends FormErrorMessageProps {
    message: string;
}

export default function FormError({ message, ...props }: Props) {
    return (
        <FormErrorMessage {...props}>
            <Icon icon={AlertCircleOutline} mr={1} w={5} h={5} />
            <Text>{message}</Text>
        </FormErrorMessage>
    );
}
