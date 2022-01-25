import { Flex } from "@chakra-ui/react";
import withAuth from "../hoc/withAuth";
import Head from "next/head";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <Flex flexDir="column" alignItems="center" minH="100vh">
            <Head>
                <title>Better Habits</title>
            </Head>
            <Navbar />
        </Flex>
    );
}

export default withAuth(Home);
