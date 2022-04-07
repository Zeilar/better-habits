import { Box, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect } from "react";

export default function ContainerSpinner() {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);

    return (
        <Flex pos="fixed" w="100%" h="100vh" alignItems="center" justifyContent="center" p={4} zIndex={10000}>
            <Box pos="fixed" w="100%" h="100%" bgColor="blackAlpha.700" backdropFilter="blur(2px)" />
            <Flex alignItems="center" justifyContent="center" p={2} bgColor="gray.500" zIndex={5} rounded="lg">
                <Spinner color="cyan.main" size="xl" emptyColor="gray.50" speed="0.65s" thickness="4px" />
            </Flex>
        </Flex>
    );
}
