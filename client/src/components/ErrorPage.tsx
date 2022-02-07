import { Flex, Text, Divider } from "@chakra-ui/react";

interface Props {
    code: number;
    message: string;
}

export default function ErrorPage({ code, message }: Props) {
    return (
        <Flex
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
            h="100vh"
        >
            <Flex h={8} alignItems="center">
                <Text textStyle="h5" as="h5">
                    {code}
                </Text>
                <Divider orientation="vertical" mx={6} />
                <Text textStyle="h5" as="h5">
                    {message}
                </Text>
            </Flex>
        </Flex>
    );
}