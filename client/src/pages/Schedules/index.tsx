import { Grid, Skeleton, Text, Divider, Flex, Box, Button } from "@chakra-ui/react";
import { useCSR, useSort } from "../../hooks";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { sortBy, sorts } from "./service";
import { useEffect, useState } from "react";
import { Schedule } from "../../../@types/schedule";
import { ArrowDownShort, ArrowUpShort, Plus } from "styled-icons/bootstrap";
import AssetIcon from "../../components/AssetIcon";
import PageBanner from "../../components/PageBanner";
import { isToday } from "../../utils/date";
import Event from "../../components/Event";
import Select, { SelectItem } from "../../components/Select";

type Show = "all" | "today";

const sortOptions: SelectItem[] = [{ label: "Date", value: "0" }];

export default function Schedules() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data, success, loading } = useCSR<Schedule[]>("/schedules");
    const [sortOptionsSelection, setSortOptionsSelection] = useState(0);
    const sorter = useSort<Schedule>(data, { defaultDirection: "desc" });
    const sort = sorts[sortOptionsSelection];
    const [show, setShow] = useState<Show>(() => {
        const show = searchParams.get("show");
        return show !== "all" && show !== "today" ? "today" : show;
    });

    useEffect(() => {
        navigate({ search: `?show=${show}` });
    }, [show, navigate]);

    let schedules: Schedule[] = [];

    if (success) {
        schedules = sortBy(sorter.sort, sort.property);
        if (show === "today") {
            schedules = schedules.filter(schedule => isToday(schedule.days));
        }
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
                    <PageBanner mb={4}>
                        <Text textStyle="h3" as="h3">
                            My schedule
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
                                left={show === "all" ? "50%" : 0}
                                h="100%"
                                w="50%"
                            />
                            <Button
                                w="50%"
                                variant="unstyled"
                                onClick={() => setShow("today")}
                                color={show === "today" ? "black" : undefined}
                            >
                                Today
                            </Button>
                            <Button
                                w="50%"
                                variant="unstyled"
                                onClick={() => setShow("all")}
                                color={show === "all" ? "black" : undefined}
                            >
                                All
                            </Button>
                        </Flex>
                    </Card>
                    <Flex flexDir="column" gridGap={4} overflowY="auto" p={4} pt={0}>
                        {schedules.length === 0 && (
                            <Flex flexDir="column" alignItems="center">
                                <AssetIcon size="75%" icon="void" />
                                <Flex flexDir="column" alignItems="center">
                                    <Text as="h3" textStyle="h3" textAlign="center" mt={4}>
                                        No programs were found
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                        {schedules.map(schedule => (
                            <Event schedule={schedule} key={schedule.id} />
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
