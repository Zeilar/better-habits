import { Flex } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";

export default function Settings() {
    return (
        <Flex flexDir="column" alignItems="center" minH="100vh">
            <Navbar />
        </Flex>
    );
}
