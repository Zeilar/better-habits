import { Flex, FlexProps } from "@chakra-ui/layout";

export default function Card(props: FlexProps) {
    return (
        <Flex flexDir="column" bgColor="gray.600" rounded="md" boxShadow="card" p={4} {...props}>
            {props.children}
        </Flex>
    );
}
