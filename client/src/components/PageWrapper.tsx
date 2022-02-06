import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
    children: React.ReactNode;
}

export default function PageWrapper({ children, ...props }: Props) {
    return (
        <Flex
            flexDir="column"
            minH="calc(100vh - var(--chakra-sizes-navbarHeight))"
            {...props}
        >
            {children}
        </Flex>
    );
}
