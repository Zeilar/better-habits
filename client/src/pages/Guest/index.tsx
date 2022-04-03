import { Text, Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { hero } from "../../assets/images";
import { BRAND_NAME } from "../../utils/constants";
import { useTitle } from "../../hooks";

export default function Guest() {
    useTitle(`Welcome | ${BRAND_NAME}`);
    return (
        <Flex
            h="100vh"
            p={6}
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            bgImg={hero}
            bgPos="center"
            bgSize="cover"
            pos="relative"
            _after={{
                content: `""`,
                pos: "absolute",
                h: "100%",
                w: "100%",
                bgColor: "blackAlpha.800",
                inset: 0,
            }}
        >
            <Box zIndex={10}>
                <Text textStyle="h1" as="h1">
                    👋
                </Text>
                <Text textStyle="h4" as="h4">
                    {`Welcome to `}
                    <Text as="span" color="primary.600" fontWeight={600}>
                        {BRAND_NAME}
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
            </Box>
        </Flex>
    );
}
