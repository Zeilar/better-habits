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
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { getDay, isToday, sortBy, sorts } from "./service";
import { useState } from "react";
import { Schedule } from "../../../@types/schedule";

export default function Schedules() {
    const { data, success, loading } = useCSR<Schedule[]>("/schedules");
    const [sortIndex, setSortIndex] = useState(0);
    const sortSelector = useDisclosure();
    const sortSelectorEl = useOnClickOutside<HTMLDivElement>(() => {
        sortSelector.onClose();
    });
    const sorter = useSort<Schedule>(data, { defaultDirection: "desc" });
    const sort = sorts[sortIndex];
    const [onlyToday, setOnlyToday] = useState(false);

    function onSortChange(index: number) {
        sortSelector.onClose();
        setSortIndex(index);
    }

    let schedules: Schedule[] = [];

    if (success) {
        schedules = sortBy(sorter.sort, sort.property);
        if (onlyToday) {
            schedules = schedules.filter(schedule => isToday(schedule.day));
        }
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
                    <Box px={4}>
                        <Text textStyle="h3" as="h3" mb={4}>
                            My schedule
                        </Text>
                        <Card p={1} rounded="pill">
                            <Flex
                                pos="relative"
                                h={10}
                                rounded="pill"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box
                                    pos="absolute"
                                    top={0}
                                    rounded="pill"
                                    transitionDuration="0.15s"
                                    transitionProperty="left"
                                    bgColor="primary.600"
                                    left={onlyToday ? "50%" : 0}
                                    h="100%"
                                    w="50%"
                                />
                                <Button
                                    w="50%"
                                    variant="unstyled"
                                    onClick={() => setOnlyToday(false)}
                                    color={!onlyToday ? "black" : undefined}
                                >
                                    All
                                </Button>
                                <Button
                                    w="50%"
                                    variant="unstyled"
                                    onClick={() => setOnlyToday(true)}
                                    color={onlyToday ? "black" : undefined}
                                >
                                    Today
                                </Button>
                            </Flex>
                        </Card>
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
                                    p={2}
                                    minW="10rem"
                                    flexDir="column"
                                    pos="absolute"
                                    top={10}
                                    left={0}
                                    bgColor="gray.500"
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
                        </Flex>
                    </Box>
                    <Divider m={4} w="auto" />
                    <Flex flexDir="column" gridGap={4} overflowY="auto" p={4} pt={0}>
                        {schedules.length === 0 && (
                            <AbsoluteCenter w="100%" px={4}>
                                <Flex flexDir="column" alignItems="center">
                                    <Icon icon="mdiGhost" w={12} h={12} />
                                    <Text as="h3" textStyle="h3" textAlign="center" mt={4}>
                                        No programs were found
                                    </Text>
                                </Flex>
                            </AbsoluteCenter>
                        )}
                        {schedules.map(schedule => (
                            <Link as={ReactLink} to={`/schedule/${schedule.id}`} key={schedule.id} color="text.default">
                                <Card>
                                    <Flex flexDir="column">
                                        <Flex alignItems="center">
                                            <Icon icon="mdiCalendar" />
                                            <Text ml={2} as="span" textTransform="capitalize">
                                                {getDay(schedule.day)}
                                            </Text>
                                            {isToday(schedule.day) && (
                                                <Text color="primary.600" as="span" ml="auto">
                                                    Today
                                                </Text>
                                            )}
                                        </Flex>
                                        <Divider my={4} />
                                        <Flex alignItems="center">
                                            <Icon icon="mdiClock" />
                                            <Text ml={2} as="span">
                                                {schedule.start} - {schedule.end}
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
                to="/schedule/new"
                p={1}
            >
                <Icon icon="mdiPlus" w={6} h={6} color="black" />
            </Flex>
        </PageWrapper>
    );
}
