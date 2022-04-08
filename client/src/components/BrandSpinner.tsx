import { Flex, Text, FlexProps } from "@chakra-ui/layout";
import { keyframes } from "@chakra-ui/system";
import theme from "../theme";
import { BRAND_NAME } from "../utils/constants";

const pulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 ${theme.colors.cyan["300"]};
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
            bgColor="cyan.main"
            justifyContent="center"
            h="5rem"
            w="5rem"
            {...props}
        >
            <Text as="h1" fontWeight={700} textAlign="center" whiteSpace="nowrap" color="black">
                {BRAND_NAME[0]}
            </Text>
        </Flex>
    );
}
