import { Grid, Skeleton, Text, Divider, Flex, Box, Button, useDisclosure, AbsoluteCenter } from "@chakra-ui/react";
import { useCSR, useOnClickOutside, useSort } from "../../hooks";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { getDay, isToday, sortBy, sorts } from "./service";
import { useEffect, useState } from "react";
import { Schedule } from "../../../@types/schedule";
import { ArrowDownShort, ArrowUpShort, Plus } from "styled-icons/bootstrap";
import { ClipboardBulletListLtr, Dumbbell } from "styled-icons/fluentui-system-regular";
import { Clock } from "styled-icons/fa-regular";
import AssetIcon from "../../components/AssetIcon";

type Show = "all" | "today";

export default function Schedules() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data, success, loading } = useCSR<Schedule[]>("/schedules");
    const [sortIndex, setSortIndex] = useState(0);
    const sortSelector = useDisclosure();
    const sortSelectorEl = useOnClickOutside<HTMLDivElement>(() => {
        sortSelector.onClose();
    });
    const sorter = useSort<Schedule>(data, { defaultDirection: "desc" });
    const sort = sorts[sortIndex];
    const [show, setShow] = useState<Show>(() => {
        const show = searchParams.get("show");
        return show !== "all" && show !== "today" ? "all" : show;
    });

    useEffect(() => {
        navigate({ search: `?show=${show}` });
    }, [show, navigate]);

    function onSortChange(index: number) {
        sortSelector.onClose();
        setSortIndex(index);
    }

    let schedules: Schedule[] = [];

    if (success) {
        schedules = sortBy(sorter.sort, sort.property);
        if (show) {
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
                        <Flex pos="relative" justifyContent="space-between">
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
                                        zIndex={100}
                                        top={10}
                                        left={0}
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
                    <Divider m={4} w="auto" />
                    <Card p={1} rounded="pill" mx={4} mb={4}>
                        <Flex pos="relative" h={10} rounded="pill" alignItems="center" justifyContent="space-between">
                            <Box
                                pos="absolute"
                                top={0}
                                rounded="pill"
                                transitionDuration="0.15s"
                                transitionProperty="left"
                                bgColor="primary.600"
                                left={show === "today" ? "50%" : 0}
                                h="100%"
                                w="50%"
                            />
                            <Button
                                w="50%"
                                variant="unstyled"
                                onClick={() => setShow("all")}
                                color={show === "all" ? "black" : undefined}
                            >
                                All
                            </Button>
                            <Button
                                w="50%"
                                variant="unstyled"
                                onClick={() => setShow("today")}
                                color={show === "today" ? "black" : undefined}
                            >
                                Today
                            </Button>
                        </Flex>
                    </Card>
                    <Flex flexDir="column" gridGap={4} overflowY="auto" p={4} pt={0}>
                        {schedules.length === 0 && (
                            <AbsoluteCenter w="100%" px={4}>
                                <AssetIcon icon="void" />
                                <Flex flexDir="column" alignItems="center">
                                    <Text as="h3" textStyle="h3" textAlign="center" mt={4}>
                                        No programs were found
                                    </Text>
                                </Flex>
                            </AbsoluteCenter>
                        )}
                        {schedules.map(schedule => (
                            <Card key={schedule.id}>
                                <Flex flexDir="column">
                                    <Flex alignItems="center">
                                        <Icon icon={Dumbbell} />
                                        <Text
                                            ml={2}
                                            as={ReactLink}
                                            to={`/program/${schedule.program.id}`}
                                            color="text.default"
                                        >
                                            {schedule.program.name}
                                        </Text>
                                    </Flex>
                                    <Divider my={4} />
                                    <Flex alignItems="center">
                                        <Icon icon={ClipboardBulletListLtr} />
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
                                        <Icon icon={Clock} />
                                        <Text ml={2} as="span">
                                            {schedule.start} - {schedule.end}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Card>
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
                <Icon icon={Plus} w={6} h={6} color="black" />
            </Flex>
        </PageWrapper>
    );
}
