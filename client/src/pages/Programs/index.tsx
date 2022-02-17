import { Grid, Skeleton, Box, Text, Link, Divider, Flex } from "@chakra-ui/react";
import { useCSR } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { exercisesCombinedDuration } from "./service";

export default function Programs() {
    const { data, success, loading } = useCSR<Program<true>[]>("/programs", { params: { withExercises: true } });

    return (
        <PageWrapper p={4}>
            {loading && (
                <Grid p={4} gridGap={2}>
                    {Array(5)
                        .fill(null)
                        .map((_, i) => (
                            <Skeleton height="7rem" key={i} rounded="md" />
                        ))}
                </Grid>
            )}
            {success && (
                <>
                    <Text textStyle="h3" as="h3" mb={4}>
                        My programs
                    </Text>
                    <Flex flexDir="column" gridGap={4}>
                        {data.map(program => (
                            <Link as={ReactLink} to={`/program/${program.id}`} key={program.id}>
                                <Card>
                                    <Text>{program.name}</Text>
                                    <Divider my={4} />
                                    <Flex alignItems="center">
                                        <Flex alignItems="center">
                                            <Icon icon="mdiWeightLifter" />
                                            <Text ml={2} as="span">
                                                {program.exercises.length}
                                            </Text>
                                        </Flex>
                                        <Divider orientation="vertical" mx={4} height={4} />
                                        <Flex alignItems="center">
                                            <Icon icon="mdiClock" />
                                            <Text ml={2} as="span">
                                                {exercisesCombinedDuration(program.exercises)}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Link>
                        ))}
                    </Flex>
                </>
            )}
            <Box
                as={ReactLink}
                bottom="calc(var(--chakra-sizes-navbarHeight) + 2rem)"
                pos="fixed"
                transform="translateX(-50%)"
                left="50%"
                rounded="full"
                bgColor="primary.600"
                to="/programs/new"
                p={1}
            >
                <Icon icon="mdiPlus" w="2rem" h="2rem" color="black" />
            </Box>
        </PageWrapper>
    );
}
