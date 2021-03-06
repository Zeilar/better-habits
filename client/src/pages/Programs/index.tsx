import { Grid, Skeleton, Text, Link, Flex, Box, Button } from "@chakra-ui/react";
import { useCSR, useSort } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import CardBody from "../../components/Card/CardBody";
import { sortBy, SortProperty } from "./service";
import { useState } from "react";
import { ArrowDownShort } from "@styled-icons/bootstrap/ArrowDownShort";
import { ArrowUpShort } from "@styled-icons/bootstrap/ArrowUpShort";
import { Plus } from "@styled-icons/bootstrap/Plus";
import AssetIcon from "../../components/AssetIcon";
import Select, { SelectItem } from "../../components/Select";
import { BRAND_NAME } from "../../utils/constants";
import { useTitle } from "@zeilar/hooks";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import { fadeInAnimation } from "../../styles/aimations";
import ExercisesAccordion from "../../components/ExercisesAccordion";

interface Sort {
    property: SortProperty;
    label: string;
}

const sorts: Sort[] = [
    { property: "name", label: "Name" },
    { property: "updatedAt", label: "Last updated" },
    { property: "duration", label: "Duration" },
    { property: "exercises", label: "Exercises" },
];

const sortOptions: SelectItem[] = sorts.map((sort, i) => ({ label: sort.label, value: i.toString() }));

export default function Programs() {
    const { data, success, loading } = useCSR<Program[]>("/programs", { params: { withExercises: true } });
    const [sortOptionsSelection, setSortOptionsSelection] = useState(0);
    const sorter = useSort<Program>(data, { defaultDirection: "desc" });
    useTitle(`Programs | ${BRAND_NAME}`);
    const sort = sorts[sortOptionsSelection];

    return (
        <PageWrapper noScroll animation={fadeInAnimation}>
            {loading && (
                <Grid p={4} gridGap={2}>
                    {Array(5)
                        .fill(null)
                        .map((_, i) => (
                            <Skeleton height="11.9rem" key={i} rounded="lg" />
                        ))}
                </Grid>
            )}
            {success && (
                <>
                    <Box>
                        <Text textStyle="pageTitle" p={4}>
                            My programs
                        </Text>
                        <Flex px={4} mb={4}>
                            <Select
                                value={sortOptions[sortOptionsSelection]}
                                items={sortOptions}
                                onChange={item => setSortOptionsSelection(parseInt(item.value))}
                            />
                            <Button
                                ml="auto"
                                display="flex"
                                variant="unstyled"
                                _hover={{ color: "cyan.main" }}
                                onClick={sorter.toggleDirection}
                            >
                                <Text textTransform="capitalize" mr={1}>
                                    {sorter.direction === "asc" ? "Ascending" : "Descending"}
                                </Text>
                                <Icon icon={sorter.direction === "asc" ? ArrowUpShort : ArrowDownShort} />
                            </Button>
                        </Flex>
                    </Box>
                    <Box p={4} pt={0}>
                        {data.length === 0 && (
                            <Flex flexDir="column" alignItems="center">
                                <AssetIcon size="75%" icon="void" />
                                <Flex flexDir="column" alignItems="center">
                                    <Text textStyle="h3" textAlign="center" mt={4}>
                                        No programs were found
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                        <Flex flexDir="column" gridGap={4}>
                            {sortBy(sorter.sort, sort.property).map(program => (
                                <Card key={program.id}>
                                    <CardHeader>
                                        <Text textStyle="h4">{program.name}</Text>
                                    </CardHeader>
                                    <CardBody gridGap={2}>
                                        <ExercisesAccordion exercises={program.exercises} />
                                        <Link as={ReactLink} to={`/program/${program.id}`} mt={4}>
                                            View
                                        </Link>
                                    </CardBody>
                                </Card>
                            ))}
                        </Flex>
                    </Box>
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
                boxShadow="card"
                bgColor="cyan.main"
                to="/programs/new"
            >
                <Icon icon={Plus} size={6} color="text.default.contrast" />
            </Flex>
        </PageWrapper>
    );
}
