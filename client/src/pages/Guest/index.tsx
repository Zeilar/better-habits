import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function Guest() {
    const { authenticated } = useAuth();

    if (authenticated) {
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
            <Text textStyle="h1" as="h1">
                👋
            </Text>
            <Text textStyle="h4" as="h4">
                {`Welcome to `}
                <Text as="span" color="primary.400" fontWeight={600}>
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
            <Link to="/register">
                <Button w="100%" mb={2}>
                    Create account
                </Button>
            </Link>
            <Link to="/login">
                <Button w="100%" variant="secondary">
                    Login
                </Button>
            </Link>
        </Flex>
    );
}
