import { Box, Grid, Text } from "@chakra-ui/react";
import { Schedule } from "../../@types/schedule";
import Card from "../components/Card";
import Event from "../components/Event";
import PageSpinner from "../components/PageSpinner";
import PageWrapper from "../components/PageWrapper";
import { useCSR } from "../hooks";

export default function Home() {
    const todayQuery = useCSR<Schedule[]>("/schedules", { params: { today: true } });

    return (
        <PageWrapper p={4}>
            {todayQuery.loading && <PageSpinner />}
            {todayQuery.success && (
                <Box>
                    <Text textStyle="h3" as="h3" mb={2}>
                        Agenda
                    </Text>
                    <Grid gridGap={2}>
                        {todayQuery.data.length === 0 && (
                            <Card>
                                <Text>Nothing to do today!</Text>
                            </Card>
                        )}
                        {[...todayQuery.data]
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
