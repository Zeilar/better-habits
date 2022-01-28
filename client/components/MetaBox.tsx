import { Flex } from "@chakra-ui/react";

interface Props {
    children: React.ReactNode;
}

export default function MetaBox({ children }: Props) {
    return (
        <Flex flexDir="column" rounded="md" p={2} bgColor="gray.600">
            {children}
        </Flex>
    );
}
