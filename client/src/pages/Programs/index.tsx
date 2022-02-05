import { Link, Grid, Text, Skeleton } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useCSR } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";

export default function Programs() {
    const { data, success, loading } = useCSR<Program[]>("/programs");

    return (
        <PageWrapper>
            {loading && (
                <Grid p={4} w="100%" gridGap={2}>
                    {Array(5)
                        .fill(null)
                        .map((_, i) => (
                            <Skeleton w="100%" height="3.5rem" key={i} />
                        ))}
                </Grid>
            )}
            <Grid p={4} w="100%" gridGap={2}>
                {success &&
                    data.map(program => (
                        <Link
                            transition="none"
                            display="flex"
                            justifyContent="space-between"
                            as={ReactLink}
                            key={program.id}
                            bgColor="gray.600"
                            p={4}
                            rounded="md"
                            to={`/program/${program.id}`}
                            _hover={{ bgColor: "gray.400" }}
                        >
                            <Text>{program.name}</Text>
                        </Link>
                    ))}
            </Grid>
            <Navbar />
        </PageWrapper>
    );
}
