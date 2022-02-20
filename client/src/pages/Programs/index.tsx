import { Grid, Skeleton, Text, Link, Divider, Flex, Select, Box } from "@chakra-ui/react";
import { useCSR } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { Direction, exercisesCombinedDuration, sortBy, SortProperty } from "./service";
import { useState } from "react";

interface Sort {
    property: SortProperty;
    direction: Direction;
    label: string;
}

const sorts: Sort[] = [
    { property: "date", direction: "desc", label: "Date descending" },
    { property: "date", direction: "asc", label: "Date ascending" },
    { property: "name", direction: "desc", label: "Name descending" },
    { property: "name", direction: "asc", label: "Name ascending" },
    { property: "duration", direction: "desc", label: "Duration descending" },
    { property: "duration", direction: "asc", label: "Duration ascending" },
    { property: "exercises", direction: "desc", label: "Exercises descending" },
    { property: "exercises", direction: "asc", label: "Exercises ascending" },
];

export default function Programs() {
    const { data, success, loading } = useCSR<Program<true>[]>("/programs", { params: { withExercises: true } });
    const [sortIndex, setSortIndex] = useState(0);

    const sort = sorts[sortIndex];

    return (
        <PageWrapper pt={4} noScroll>
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
                    <Box px={4} mb={4}>
                        <Text textStyle="h3" as="h3" mb={4}>
                            My programs
                        </Text>
                        <Text mb={1}>Sort by</Text>
                        <Select value={sorts.indexOf(sort)} onChange={e => setSortIndex(parseInt(e.target.value))}>
                            {sorts.map((sort, i) => (
                                <option key={i} value={i}>
                                    {sort.label}
                                </option>
                            ))}
                        </Select>
                    </Box>
                    <Flex flexDir="column" gridGap={4} overflowY="auto" p={4} pt={0}>
                        {sortBy(data, sort.property, sort.direction).map(program => (
                            <Link as={ReactLink} to={`/program/${program.id}`} key={program.id} color="text.default">
                                <Card borderLeftRadius="none" borderLeft="2px solid" borderColor="primary.600">
                                    <Text>{program.name}</Text>
                                    <Divider my={4} borderColor="border.default" />
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
            <Flex
                as={ReactLink}
                bottom="calc(var(--chakra-sizes-navbarHeight) + 1.5rem)"
                pos="fixed"
                alignItems="center"
                justifyContent="center"
                transform="translateX(-50%)"
                left="50%"
                rounded="full"
                w={8}
                h={8}
                boxShadow="0 0 8px rgba(0, 0, 0, 0.5)"
                bgColor="primary.600"
                to="/programs/new"
                p={1}
            >
                <Icon icon="mdiPlus" w={6} h={6} color="black" />
            </Flex>
        </PageWrapper>
    );
}
