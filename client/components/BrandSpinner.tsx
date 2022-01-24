import { Flex, Text, keyframes } from "@chakra-ui/react";

const pulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(92, 255, 176, 1);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(92, 255, 176, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(92, 255, 176, 0);
    }
`;

export default function BrandSpinner() {
    return (
        <Flex
            animation={`${pulse} infinite 1.5s linear`}
            flexDir="column"
            alignItems="center"
            rounded="full"
            bgColor="primary.400"
            justifyContent="center"
            h="5rem"
            w="5rem"
        >
            <Text
                as="h1"
                textStyle="h1"
                textAlign="center"
                whiteSpace="nowrap"
                color="black"
            >
                BH
            </Text>
        </Flex>
    );
}
