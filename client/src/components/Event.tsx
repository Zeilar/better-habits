import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { Schedule } from "../../@types/schedule";
import CardBody from "./Card/CardBody";
import Icon from "./Icon";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import { exercisesCombinedDuration } from "../pages/Programs/service";
import { Clock } from "styled-icons/fa-regular";
import Chip from "./Chip";

interface Props extends FlexProps {
    schedule: Schedule;
}

export default function Event({ schedule, ...props }: Props) {
    const duration = exercisesCombinedDuration(schedule.program.exercises);
    return (
        <Card {...props}>
            <CardHeader>
                <Text textStyle="h4" as="h4">
                    {schedule.program.name}
                </Text>
            </CardHeader>
            <CardBody>
                <Flex justifyContent="space-between">
                    <Text textStyle="h4">
                        {schedule.from} - {schedule.to}
                    </Text>
                    {duration > 0 && (
                        <Flex alignItems="center">
                            <Text>{duration}</Text>
                            <Icon icon={Clock} ml={2} />
                        </Flex>
                    )}
                </Flex>
                {schedule.days.length > 0 && (
                    <Flex gridGap={2} flexWrap="wrap" mt={4}>
                        {schedule.days.map(({ day, id }) => (
                            <Chip key={id}>{day}</Chip>
                        ))}
                    </Flex>
                )}
            </CardBody>
        </Card>
    );
}
