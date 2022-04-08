import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { Schedule } from "../../@types/schedule";
import CardBody from "./Card/CardBody";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import Chip from "./Chip";
import ExercisesAccordion from "./ExercisesAccordion";
import { days } from "../utils/constants";

interface Props extends FlexProps {
    schedule: Schedule;
}

export default function Event({ schedule, ...props }: Props) {
    return (
        <Card {...props}>
            <CardHeader>
                <Text textStyle="h4">{schedule.program.name}</Text>
            </CardHeader>
            <CardBody>
                <Text textStyle="h4">
                    {schedule.from} - {schedule.to}
                </Text>
                {schedule.days.length > 0 && (
                    <Flex gridGap={2} flexWrap="wrap" mt={4}>
                        {[...schedule.days]
                            .sort((a, b) => (days.indexOf(a.day) > days.indexOf(b.day) ? 1 : -1))
                            .map(({ day, id }) => (
                                <Chip key={id}>{day}</Chip>
                            ))}
                    </Flex>
                )}
                <ExercisesAccordion exercises={schedule.program.exercises} mt={8} />
            </CardBody>
        </Card>
    );
}
