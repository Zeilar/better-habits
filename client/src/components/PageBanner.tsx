import { Flex, FlexProps } from "@chakra-ui/react";

export default function PageBanner(props: FlexProps) {
    return <Flex alignItems="center" bgColor="gray.600" boxShadow="elevate.bottom" p={4} {...props} />;
}
