import { Flex } from "@chakra-ui/react";

interface Props {
    children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
    return (
        <Flex flexDir="column" alignItems="center" minH="100vh">
            {children}
        </Flex>
    );
}
