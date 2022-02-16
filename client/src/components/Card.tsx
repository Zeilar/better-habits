import { Flex, FlexProps } from "@chakra-ui/react";

export default function Card(props: FlexProps) {
    return (
        <Flex flexDir="column" bgColor="gray.800" rounded="md" boxShadow="card" p={4} {...props}>
            {props.children}
        </Flex>
    );
}
