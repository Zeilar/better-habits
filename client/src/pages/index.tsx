import { Box, Grid, Text } from "@chakra-ui/react";
import { useTitle } from "@zeilar/hooks";
import { useRef } from "react";
import { Schedule } from "../../@types/schedule";
import PageSpinner from "../components/PageSpinner";
import PageWrapper from "../components/PageWrapper";
import { useCSR } from "../hooks";
import { BRAND_NAME } from "../utils/constants";
import Event from "../components/Event";
import { fadeInAnimation } from "../styles/aimations";

export default function Home() {
    const now = useRef(new Date());
    const todayQuery = useCSR<Schedule[]>("/schedules", { params: { day: now.current.toISOString() } });
    const tomorrowQuery = useCSR<Schedule[]>("/schedules", {
        params: { day: new Date(now.current.getTime() + 1000 * 60 * 60 * 24).toISOString() },
    });
    useTitle(`Home | ${BRAND_NAME}`);
    return (
        <PageWrapper p={4} animation={fadeInAnimation}>
            {(todayQuery.loading || tomorrowQuery.loading) && <PageSpinner />}
            {todayQuery.success && todayQuery.data.length > 0 && (
                <Box>
                    <Text textStyle="pageTitle" mb={2}>
                        Today
                    </Text>
                    <Grid gridGap={2}>
                        {[...todayQuery.data]
                            .sort((a, b) => (a.from > b.from ? 1 : -1))
                            .map(schedule => (
                                <Event schedule={schedule} key={schedule.id} />
                            ))}
                    </Grid>
                </Box>
            )}
            {tomorrowQuery.success && tomorrowQuery.data.length > 0 && (
                <Box mt={4}>
                    <Text textStyle="pageTitle" mb={2}>
                        Tomorrow
                    </Text>
                    <Grid gridGap={2}>
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
