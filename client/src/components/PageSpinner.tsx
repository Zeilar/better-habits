import { Flex } from "@chakra-ui/layout";
import BrandSpinner from "./BrandSpinner";

export default function PageSpinner() {
    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <BrandSpinner />
        </Flex>
    );
}
