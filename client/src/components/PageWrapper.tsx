import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
    noScroll?: boolean;
}

export default function PageWrapper({ children, noScroll, ...props }: Props) {
    const heightCss = { [noScroll ? "h" : "minH"]: "calc(100vh - var(--chakra-sizes-navbarHeight))" };
    return (
        <Flex flexDir="column" {...heightCss} {...props}>
            {children}
        </Flex>
    );
}
