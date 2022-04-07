import { Flex, FlexProps } from "@chakra-ui/layout";

export default function CardBody(props: FlexProps) {
    return <Flex flexDir="column" bgColor="gray.800" p={4} {...props} />;
}
