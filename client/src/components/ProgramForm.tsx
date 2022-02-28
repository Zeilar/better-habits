import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Program } from "../../@types/program";
import Card from "./Card";
import ContainerSpinner from "./ContainerSpinner";
import Icon from "./Icon";

interface ExerciseField {
    name: string;
    sets?: number;
    duration?: number;
}

export type Fields = { name: string; exercises: ExerciseField[] };

interface Props {
    program?: Program<true>;
    onSubmit(fields: Fields): Promise<void>;
    submitting?: boolean;
    controls?: React.ReactNode;
}

export default function ProgramForm({ program, onSubmit, submitting, controls }: Props) {
    const { handleSubmit, register, formState, control } = useForm<Fields>({ defaultValues: program });
    const exercises = useFieldArray({ name: "exercises", control });
    const exercisesEl = useRef<HTMLDivElement>(null);
    const shouldScroll = useRef(false);

    const addExercise = useCallback(() => {
        exercises.append({ name: "", duration: 0, sets: 0 });
        shouldScroll.current = true;
    }, [exercises]);

    useEffect(() => {
        if (exercises.fields.length === 0) {
            addExercise();
        }
    }, [exercises.fields.length, addExercise]);

    useEffect(() => {
        if (exercises.fields.length > 1 && shouldScroll.current) {
            exercisesEl.current?.scrollTo({ top: 99999, behavior: "smooth" });
            shouldScroll.current = false;
        }
    }, [exercises.fields.length]);

    return (
        <Flex as="form" onSubmit={handleSubmit(onSubmit)} h="100%" flexDir="column" flexGrow={1} overflow="hidden">
            {(submitting || formState.isSubmitting) && <ContainerSpinner />}
            <Flex pt={4} flexDir="column" overflowY="auto">
                <FormControl isInvalid={Boolean(formState.errors.name)} mb={4} px={4}>
                    <FormLabel htmlFor="name">
                        <Text textStyle="h3" as="h3">
                            Name
                        </Text>
                    </FormLabel>
                    <Input
                        placeholder="Heavy weights"
                        id="name"
                        {...register("name", { required: "Field is required" })}
                    />
                    {formState.errors.name && <FormErrorMessage>{formState.errors.name.message}</FormErrorMessage>}
                </FormControl>
                <Flex justifyContent="space-between" mb={2} px={4}>
                    <Text textStyle="h3" as="h3">
                        Exercises
                    </Text>
                    <Text textStyle="h3" as="h3">
                        {exercises.fields.length}
                    </Text>
                </Flex>
                <Box ref={exercisesEl} overflowY="auto" px={4} pb={4}>
                    <Flex flexDir="column" gridGap={4}>
                        {exercises.fields.map((_, i) => {
                            const label = `exercises.${i}`;
                            const name = `${label}.name`;
                            const sets = `${label}.sets`;
                            const duration = `${label}.duration`;
                            const errors = formState.errors.exercises ? formState.errors.exercises[i] : {};
                            return (
                                <Card key={i} gridGap={4} pos="relative">
                                    {exercises.fields.length > 1 && (
                                        <Button
                                            variant="unstyled"
                                            onClick={() => exercises.remove(i)}
                                            pos="absolute"
                                            display="flex"
                                            w={8}
                                            h={8}
                                            right={1}
                                            top={1}
                                            zIndex={10}
                                        >
                                            <Icon icon="mdiClose" />
                                        </Button>
                                    )}
                                    <FormControl isInvalid={Boolean(errors?.name)}>
                                        <FormLabel htmlFor={name}>Name</FormLabel>
                                        <Input
                                            id={name}
                                            placeholder="Situps"
                                            {...register(`exercises.${i}.name`, {
                                                required: "Field is required",
                                            })}
                                        />
                                        {errors?.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                                    </FormControl>
                                    <Flex gridGap={4}>
                                        <FormControl isInvalid={Boolean(errors?.sets)}>
                                            <FormLabel htmlFor={sets}>Sets</FormLabel>
                                            <Input
                                                id={sets}
                                                placeholder="Sets"
                                                type="number"
                                                {...register(`exercises.${i}.sets`, {
                                                    setValueAs: value => Number(value) || null,
                                                })}
                                            />
                                            {errors?.sets && <FormErrorMessage>{errors.sets.message}</FormErrorMessage>}
                                        </FormControl>
                                        <FormControl isInvalid={Boolean(errors?.duration)}>
                                            <FormLabel htmlFor={duration}>Duration</FormLabel>
                                            <Input
                                                id={duration}
                                                type="number"
                                                placeholder="Duration"
                                                {...register(`exercises.${i}.duration`, {
                                                    setValueAs: value => Number(value) || null,
                                                })}
                                            />
                                            {errors?.duration && (
                                                <FormErrorMessage>{errors.duration.message}</FormErrorMessage>
                                            )}
                                        </FormControl>
                                    </Flex>
                                </Card>
                            );
                        })}
                    </Flex>
                    <Button mt={4} onClick={addExercise} w="100%">
                        Add Exercise
                    </Button>
                </Box>
            </Flex>
            <Box pos="sticky" bottom={0} mt="auto" zIndex={100}>
                {controls}
            </Box>
        </Flex>
    );
}
