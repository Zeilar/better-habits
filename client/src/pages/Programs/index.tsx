import { Flex } from "@chakra-ui/react";
import withAuth from "../../hoc/withAuth";
import Navbar from "../../components/Navbar";

function Programs() {
    return (
        <Flex flexDir="column" alignItems="center" minH="100vh">
            <Navbar />
        </Flex>
    );
}

export default withAuth(Programs);
