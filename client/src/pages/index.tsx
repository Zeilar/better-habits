import { Box, Grid, Text } from "@chakra-ui/react";
import { useTitle } from "@zeilar/hooks";
import { useRef } from "react";
import { Schedule } from "../../@types/schedule";
import CardBody from "../components/Card/CardBody";
import PageSpinner from "../components/PageSpinner";
import PageWrapper from "../components/PageWrapper";
import { useCSR } from "../hooks";
import { BRAND_NAME } from "../utils/constants";
import Event from "../components/Event";

export default function Home() {
    const now = useRef(new Date().toISOString());
    const todayQuery = useCSR<Schedule[]>("/schedules", { params: { day: now.current } });
    const tomorrowQuery = useCSR<Schedule[]>("/schedules", { params: { day: now.current } });
    useTitle(`Home | ${BRAND_NAME}`);
    return (
        <PageWrapper p={4}>
            {(todayQuery.loading || tomorrowQuery.loading) && <PageSpinner />}
            {todayQuery.success && (
                <Box>
                    <Text textStyle="h2" as="h2" mb={2} color="cyan.main">
                        Today
                    </Text>
                    <Grid gridGap={2}>
                        {todayQuery.data.length === 0 && (
                            <CardBody rounded="lg" boxShadow="card">
                                <Text>Nothing to do today!</Text>
                            </CardBody>
                        )}
                        {[...todayQuery.data]
                            .sort((a, b) => (a.from > b.from ? 1 : -1))
                            .map(schedule => (
                                <Event schedule={schedule} key={schedule.id} />
                            ))}
                    </Grid>
                </Box>
            )}
            {tomorrowQuery.success && (
                <Box mt={4}>
                    <Text textStyle="h2" as="h2" mb={2} color="cyan.main">
                        Upcoming
                    </Text>
                    <Grid gridGap={2}>
                        {tomorrowQuery.data.length === 0 && (
                            <CardBody rounded="lg" boxShadow="card">
                                <Text>Nothing to do today!</Text>
                            </CardBody>
                        )}
                        {[...tomorrowQuery.data]
                            .sort((a, b) => (a.from > b.from ? 1 : -1))
                            .map(schedule => (
                                <Event schedule={schedule} key={schedule.id} />
                            ))}
                    </Grid>
                </Box>
            )}
        </PageWrapper>
    );
}
