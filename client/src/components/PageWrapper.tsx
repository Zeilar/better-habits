import { Flex, FlexProps } from "@chakra-ui/react";

export default function PageWrapper({ children, ...props }: FlexProps) {
    return (
        <Flex flexDir="column" minH="calc(100vh - var(--chakra-sizes-navbarHeight))" {...props}>
            {children}
        </Flex>
    );
}
