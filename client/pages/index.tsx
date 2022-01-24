import { Flex } from "@chakra-ui/react";
import withAuth from "../hoc/withAuth";
import Head from "next/head";

function Home() {
    return (
        <Flex flexDir="column" alignItems="center">
            <Head>
                <title>Better Habits</title>
            </Head>
        </Flex>
    );
}

export default withAuth(Home);
