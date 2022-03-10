import {
    Grid,
    Skeleton,
    Text,
    Link,
    Divider,
    Flex,
    Box,
    Button,
    useDisclosure,
    AbsoluteCenter,
} from "@chakra-ui/react";
import { useCSR, useOnClickOutside, useSort } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { exercisesCombinedDuration, sortBy, SortProperty } from "./service";
import { useState } from "react";
import { ArrowDownShort, ArrowUpShort, Plus } from "styled-icons/bootstrap";
import { Dumbbell } from "styled-icons/fluentui-system-regular";
import { Clock } from "styled-icons/fa-regular";
import AssetIcon from "../../components/AssetIcon";
import PageBanner from "../../components/PageBanner";

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
        <PageWrapper noScroll>
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
                    <Box>
                        <PageBanner mb={4}>
                            <Text textStyle="h3" as="h3">
                                My programs
                            </Text>
                        </PageBanner>
                        <Flex pos="relative" justifyContent="space-between" px={4}>
                            <Box ref={sortSelectorEl}>
                                <Button
                                    variant="unstyled"
                                    onClick={sortSelector.onToggle}
                                    _hover={{ color: "primary.600" }}
                                >
                                    {sort.label}
                                </Button>
                                {sortSelector.isOpen && (
                                    <Flex
                                        p={2}
                                        minW="10rem"
                                        flexDir="column"
                                        pos="absolute"
                                        top={10}
                                        left={4}
                                        bgColor="gray.600"
                                        boxShadow="card"
                                        rounded="md"
                                    >
                                        {sorts.map((sort, i) => (
                                            <Box
                                                key={i}
                                                onClick={() => onSortChange(i)}
                                                py={2}
                                                px={4}
                                                userSelect="none"
                                                cursor="pointer"
                                                rounded="md"
                                                fontWeight={600}
                                                _hover={{ bgColor: "primary.600", color: "black" }}
                                            >
                                                {sort.label}
                                            </Box>
                                        ))}
                                    </Flex>
                                )}
                            </Box>
                            <Button
                                display="flex"
                                variant="unstyled"
                                _hover={{ color: "primary.600" }}
                                onClick={sorter.toggleDirection}
                            >
                                <Text textTransform="capitalize" mr={1}>
                                    {sorter.direction === "asc" ? "Ascending" : "Descending"}
                                </Text>
                                <Icon icon={sorter.direction === "asc" ? ArrowUpShort : ArrowDownShort} />
                            </Button>
                        </Flex>
                    </Box>
                    <Divider w="auto" m={4} />
                    <Flex flexDir="column" gridGap={4} overflowY="auto" p={4} pt={0}>
                        {data.length === 0 && (
                            <AbsoluteCenter w="100%" px={4}>
                                <AssetIcon icon="void" />
                                <Flex flexDir="column" alignItems="center">
                                    <Text as="h3" textStyle="h3" textAlign="center" mt={4}>
                                        No programs were found
                                    </Text>
                                </Flex>
                            </AbsoluteCenter>
                        )}
                        {sortBy(sorter.sort, sort.property).map(program => (
                            <Link as={ReactLink} to={`/program/${program.id}`} key={program.id} color="text.default">
                                <Card>
                                    <Text>{program.name}</Text>
                                    <Divider my={4} borderColor="border.default" />
                                    <Flex alignItems="center">
                                        <Flex alignItems="center">
                                            <Icon icon={Dumbbell} />
                                            <Text ml={2} as="span">
                                                {program.exercises.length}
                                            </Text>
                                        </Flex>
                                        <Divider orientation="vertical" mx={4} height={4} />
                                        <Flex alignItems="center">
                                            <Icon icon={Clock} />
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
                <Icon icon={Plus} w={6} h={6} color="black" />
            </Flex>
        </PageWrapper>
    );
}
