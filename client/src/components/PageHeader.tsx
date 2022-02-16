import { Text, TextProps } from "@chakra-ui/react";

export default function PageHeader(props: TextProps) {
    return <Text as="h2" textStyle="h2" px={4} py={4} {...props} />;
}
