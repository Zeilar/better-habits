import { Button, Flex, Text, useTheme } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import withGuest from "../../hoc/withGuest";
import { useAuth } from "../../hooks";

function Guest() {
    const { authenticated } = useAuth();
    const router = useRouter();

    if (authenticated) {
        router.replace("/");
        return null;
    }

    return (
        <Flex
            flexDir="column"
            minH="100vh"
            textAlign="center"
            p={6}
            justifyContent="center"
        >
            <Head>
                <title>Guest - Better Habits</title>
            </Head>
            <Text textStyle="h1" as="h1">
                👋
            </Text>
            <Text textStyle="h4" as="h4">
                {`Welcome to `}
                <Text as="span" color="primary.500" fontWeight={600}>
                    Better Habits
                </Text>
            </Text>
            <Text textStyle="h4" as="h4" mb={4} mt={1} color="text.muted">
                <cite>
                    <Text as="span" mr={0.5}>
                        &ldquo;
                    </Text>
                    Improving habits shouldn&apos;t be complicated
                    <Text as="span" ml={0.5}>
                        &rdquo;
                    </Text>
                </cite>
            </Text>
            <NextLink href="/register">
                <Button mb={2}>Create account</Button>
            </NextLink>
            <NextLink href="/login">
                <Button variant="secondary">Login</Button>
            </NextLink>
        </Flex>
    );
}

export default withGuest(Guest);
