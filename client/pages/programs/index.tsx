import { Flex } from "@chakra-ui/react";
import withAuth from "../../hoc/withAuth";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { apiService } from "../../services";
import { useSession } from "next-auth/react";

function Programs() {
    const session = useSession();
    console.log(session);
    return (
        <Flex flexDir="column" alignItems="center" minH="100vh">
            <Head>
                <title>My Programs - Better Habits</title>
            </Head>
            <Navbar />
        </Flex>
    );
}

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//     // console.log(await getServerSession(ctx, { providers: ["credentials"] }));
//     const { data, ok } = await apiService.request("/programs");
//     console.log(data, ok);
//     return { props: {} };
// }

export default withAuth(Programs);
