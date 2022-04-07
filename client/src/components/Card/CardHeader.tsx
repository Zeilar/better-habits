import { Flex, FlexProps } from "@chakra-ui/layout";

export default function CardHeader(props: FlexProps) {
    return (
        <Flex
            flexDir="column"
            bgColor="gray.800"
            py={2}
            px={4}
            borderBottomWidth={1}
            borderBottomColor="border.default"
            {...props}
        />
    );
}
