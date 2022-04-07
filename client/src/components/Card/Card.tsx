import { Flex, FlexProps } from "@chakra-ui/layout";

export default function Card(props: FlexProps) {
    return <Flex flexDir="column" bgColor="gray.800" rounded="lg" overflow="hidden" boxShadow="card" {...props} />;
}
