import { Flex, Text, Divider } from "@chakra-ui/react";
import Head from "next/head";

interface Props {
    code: number;
    message: string;
}

export default function ErrorPage({ code, message }: Props) {
    return (
        <Flex flexGrow={1} alignItems="center" justifyContent="center">
            <Head>
                <title>{code} - mp4</title>
            </Head>
            <Flex h={8} alignItems="center">
                <Text textStyle="h3" as="h3">
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
