import { Grid, Skeleton, Text, Link, Divider, Flex, Box, Button } from "@chakra-ui/react";
import { useCSR, useSort } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { exercisesCombinedDuration, sortBy, SortProperty } from "./service";
import { useState } from "react";
import { ArrowDownShort } from "@styled-icons/bootstrap/ArrowDownShort";
import { ArrowUpShort } from "@styled-icons/bootstrap/ArrowUpShort";
import { Plus } from "@styled-icons/bootstrap/Plus";
import { Dumbbell } from "@styled-icons/fluentui-system-regular";
import { Clock } from "@styled-icons/fa-regular";
import AssetIcon from "../../components/AssetIcon";
import PageBanner from "../../components/PageBanner";
import Select, { SelectItem } from "../../components/Select";
import { BRAND_NAME } from "../../utils/constants";
import { useTitle } from "@zeilar/hooks";

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
    const { data, success, loading } = useCSR<Program<true>[]>("/programs", { params: { withExercises: true } });
    const [sortOptionsSelection, setSortOptionsSelection] = useState(0);
    const sorter = useSort<Program<true>>(data, { defaultDirection: "desc" });
    useTitle(`Programs | ${BRAND_NAME}`);
    const sort = sorts[sortOptionsSelection];

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
                        <Flex px={4}>
                            <Select
                                value={sortOptions[sortOptionsSelection]}
                                items={sortOptions}
                                onChange={item => setSortOptionsSelection(parseInt(item.value))}
                            />
                            <Button
                                ml="auto"
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
                            <Flex flexDir="column" alignItems="center">
                                <AssetIcon size="75%" icon="void" />
                                <Flex flexDir="column" alignItems="center">
                                    <Text as="h3" textStyle="h3" textAlign="center" mt={4}>
                                        No programs were found
                                    </Text>
                                </Flex>
                            </Flex>
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
