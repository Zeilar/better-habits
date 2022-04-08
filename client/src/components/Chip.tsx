import { Text, TextProps } from "@chakra-ui/react";

export default function Chip(props: TextProps) {
    return <Text py={2} px={4} bgColor="gray.900" rounded="lg" textStyle="small" {...props} />;
}
