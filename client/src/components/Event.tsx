import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    FlexProps,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { Schedule } from "../../@types/schedule";
import CardBody from "./Card/CardBody";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import Chip from "./Chip";
import { days } from "../utils/constants";

interface Props extends FlexProps {
    schedule: Schedule;
}

export default function Event({ schedule, ...props }: Props) {
    return (
        <Card {...props}>
            <CardHeader>
                <Text textStyle="h4" as="h4">
                    {schedule.program.name}
                </Text>
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
                <Accordion allowToggle variant="outline" mt={8}>
                    <AccordionItem>
                        <AccordionButton>
                            <Text w="100%" textAlign="left">
                                Exercises
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th isNumeric>Sets</Th>
                                        <Th isNumeric>Duration</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {schedule.program.exercises.map(exercise => (
                                        <Tr key={exercise.id}>
                                            <Td>{exercise.name}</Td>
                                            <Td isNumeric>{exercise.sets}</Td>
                                            <Td isNumeric>{exercise.duration}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    );
}
