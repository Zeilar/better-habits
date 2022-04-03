import { Flex, Text, Divider } from "@chakra-ui/layout";
import { useTitle } from "@zeilar/hooks";
import { BRAND_NAME } from "../utils/constants";

interface Props {
    code: number;
    message: string;
}

export default function ErrorPage({ code, message }: Props) {
    useTitle(`${code} | ${BRAND_NAME}`);
    return (
        <Flex
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
            h="calc(100vh - var(--chakra-sizes-navbarHeight))"
        >
            <Flex h={8} alignItems="center">
                <Text textStyle="h5" as="h5">
                    {code}
                </Text>
                <Divider orientation="vertical" mx={6} />
                <Text textStyle="h5" as="h5">
                    {message}
                </Text>
            </Flex>
        </Flex>
    );
}
