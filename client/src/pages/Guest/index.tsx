import { Text, Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { hero } from "../../assets/images";
import { BRAND_NAME } from "../../utils/constants";
import { useTitle } from "@zeilar/hooks";

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
                bgColor: "blackAlpha.500",
                inset: 0,
            }}
        >
            <Box zIndex={10} color="text.default.contrast">
                <Text textStyle="h1" as="h1">
                    👋
                </Text>
                <Text textStyle="h4" as="h4">
                    {`Welcome to `}
                    <Text as="span" color="cyan.main" fontWeight={600}>
                        {BRAND_NAME}
                    </Text>
                </Text>
                <Text textStyle="h5" as="h5" mb={4} mt={1} opacity={0.75}>
                    <cite>&ldquo;Improving habits shouldn&apos;t be complicated&rdquo;</cite>
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
