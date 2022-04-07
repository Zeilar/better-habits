import { Text, TextProps } from "@chakra-ui/react";

export default function Chip(props: TextProps) {
    return <Text p={2} bgColor="gray.900" rounded="lg" textStyle="small" {...props} />;
}
