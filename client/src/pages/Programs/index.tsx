import { Grid, Skeleton, Text, Link, Divider, Flex, Box, Button, useDisclosure } from "@chakra-ui/react";
import { useCSR, useOnClickOutside, useSort } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { exercisesCombinedDuration, sortBy, SortProperty } from "./service";
import { useState } from "react";

interface Sort {
    property: SortProperty;
    label: string;
}

const sorts: Sort[] = [
    { property: "name", label: "Name" },
    { property: "lastUpdated", label: "Last updated" },
    { property: "duration", label: "Duration" },
    { property: "exercises", label: "Exercises" },
];

export default function Programs() {
    const { data, success, loading } = useCSR<Program<true>[]>("/programs", { params: { withExercises: true } });
    const [sortIndex, setSortIndex] = useState(0);
    const sortSelector = useDisclosure();
    const sortSelectorEl = useOnClickOutside<HTMLDivElement>(() => {
        sortSelector.onClose();
    });
    const sorter = useSort<Program<true>>(data, { defaultDirection: "desc" });

    const sort = sorts[sortIndex];

    function onSortChange(index: number) {
        sortSelector.onClose();
        setSortIndex(index);
    }

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
                    <Box px={4} mb={2}>
                        <Text textStyle="h3" as="h3" mb={4}>
                            My programs
                        </Text>
                        <Flex pos="relative" ref={sortSelectorEl} justifyContent="space-between">
                            <Button
                                variant="unstyled"
                                onClick={sortSelector.onToggle}
                                _hover={{ color: "primary.600" }}
                            >
                                {sort.label}
                            </Button>
                            <Button
                                variant="unstyled"
                                _hover={{ color: "primary.600" }}
                                onClick={sorter.toggleDirection}
                            >
                                <Icon icon={sorter.direction === "asc" ? "mdiArrowUp" : "mdiArrowDown"} />
                            </Button>
                            {sortSelector.isOpen && (
                                <Flex
                                    minW="10rem"
                                    flexDir="column"
                                    pos="absolute"
                                    top={10}
                                    left={0}
                                    bgColor="gray.800"
                                    boxShadow="card"
                                    rounded="md"
                                >
                                    {sorts.map((sort, i) => (
                                        <Box
                                            key={i}
                                            onClick={() => onSortChange(i)}
                                            p={4}
                                            userSelect="none"
                                            cursor="pointer"
                                            _first={{ roundedTop: "md" }}
                                            _last={{ roundedBottom: "md" }}
                                            _hover={{ bgColor: "gray.500" }}
                                        >
                                            {sort.label}
                                        </Box>
                                    ))}
                                </Flex>
                            )}
                        </Flex>
                    </Box>
                    <Flex flexDir="column" gridGap={4} overflowY="auto" p={4} pt={0}>
                        {sortBy(sorter.sort, sort.property).map(program => (
                            <Link as={ReactLink} to={`/program/${program.id}`} key={program.id} color="text.default">
                                <Card>
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
