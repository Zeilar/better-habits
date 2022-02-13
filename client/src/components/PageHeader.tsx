import { Text, TextProps } from "@chakra-ui/react";

export default function PageHeader(props: TextProps) {
    return <Text as="h2" textStyle="h2" color="primary.400" px={8} py={4} {...props} />;
}
