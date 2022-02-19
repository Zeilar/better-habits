import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
    noScroll?: boolean;
}

export default function PageWrapper({ children, noScroll, ...props }: Props) {
    const css = { [noScroll ? "h" : "minH"]: `calc(100vh - var(--chakra-sizes-navbarHeight))` };
    return (
        <Flex flexDir="column" overflowY="auto" {...css} {...props}>
            {children}
        </Flex>
    );
}
