import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
    children: React.ReactNode;
}

export default function PageWrapper({ children, ...props }: Props) {
    return (
        <Flex flexDir="column" alignItems="center" minH="100vh" {...props}>
            {children}
        </Flex>
    );
}
