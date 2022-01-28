import withAuth from "../hoc/withAuth";
import Head from "next/head";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import MetaBox from "../components/MetaBox";

function Home() {
    return (
        <PageWrapper>
            <Head>
                <title>Better Habits</title>
            </Head>
            <MetaBox>Hello</MetaBox>
            <Navbar />
        </PageWrapper>
    );
}

export default withAuth(Home);
