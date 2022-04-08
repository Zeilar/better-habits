import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AccordionProps,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { Exercise } from "../../@types/exercise";

interface Props extends AccordionProps {
    exercises: Exercise[];
}

export default function ExercisesAccordion({ exercises = [], ...props }: Props) {
    return (
        <Accordion allowToggle variant="outline" {...props}>
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
                            {exercises.map(exercise => (
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
    );
}
