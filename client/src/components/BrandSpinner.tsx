import { Flex, Text, keyframes, FlexProps } from "@chakra-ui/react";

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

export default function BrandSpinner(props: FlexProps) {
    return (
        <Flex
            animation={`${pulse} infinite 1.5s linear`}
            flexDir="column"
            alignItems="center"
            rounded="full"
            fontSize="2rem"
            bgColor="primary.600"
            justifyContent="center"
            h="5rem"
            w="5rem"
            {...props}
        >
            <Text as="h1" fontWeight={700} textAlign="center" whiteSpace="nowrap" color="black">
                BH
            </Text>
        </Flex>
    );
}
