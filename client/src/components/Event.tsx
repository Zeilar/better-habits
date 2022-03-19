import { Divider, Flex, Text } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { Clock } from "styled-icons/fa-regular";
import { ClipboardBulletListLtr, Dumbbell } from "styled-icons/fluentui-system-regular";
import { Schedule } from "../../@types/schedule";
import Card from "./Card";
import Icon from "./Icon";

interface Props {
    schedule: Schedule;
}

export default function Event({ schedule }: Props) {
    return (
        <Card>
            <Flex flexDir="column">
                <Flex alignItems="center">
                    <Icon icon={Dumbbell} />
                    <Text ml={2} as={ReactLink} to={`/program/${schedule.program.id}`} color="text.default">
                        {schedule.program.name}
                    </Text>
                </Flex>
                <Divider my={4} />
                <Flex alignItems="center">
                    <Icon icon={ClipboardBulletListLtr} />
                    <Text ml={2} as="span" textTransform="capitalize">
                        {schedule.days.map(scheduleDay => scheduleDay.day).join(", ")}
                    </Text>
                </Flex>
                <Divider my={4} />
                <Flex alignItems="center">
                    <Icon icon={Clock} />
                    <Text ml={2} as="span">
                        {schedule.from} - {schedule.to}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    );
}
