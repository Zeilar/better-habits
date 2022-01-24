import { Button, Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Guest() {
    return (
        <Flex
            flexDir="column"
            minH="100vh"
            textAlign="center"
            p="1rem"
            justifyContent="center"
        >
            <Text textStyle="h1" as="h1">
                👋
            </Text>
            <Text textStyle="h4" mb="1rem" as="h4">
                {`Welcome to `}
                <Text as="span" color="primary.500" fontWeight={600}>
                    Better Habits
                </Text>
            </Text>
            <NextLink href="/register">
                <Button mb="0.5rem">Create account</Button>
            </NextLink>
            <NextLink href="/login">
                <Button variant="secondary">Login</Button>
            </NextLink>
        </Flex>
    );
}
