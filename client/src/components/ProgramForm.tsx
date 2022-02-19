import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
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

    const addExercise = useCallback(() => {
        exercises.append({ name: "", duration: 0, sets: 0 });
    }, [exercises]);

    useEffect(() => {
        if (exercises.fields.length === 0) {
            addExercise();
        }
    }, [exercises.fields.length, addExercise]);

    return (
        <Flex as="form" onSubmit={handleSubmit(onSubmit)} h="100%" flexDir="column" flexGrow={1}>
            {(submitting || formState.isSubmitting) && <ContainerSpinner />}
            <Flex p={4} gridGap={4} flexDir="column">
                <FormControl isInvalid={Boolean(formState.errors.name)}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        placeholder="Weight lifting"
                        id="name"
                        {...register("name", { required: "Field is required" })}
                    />
                    {formState.errors.name && <FormErrorMessage>{formState.errors.name.message}</FormErrorMessage>}
                </FormControl>
                <Text>Exercises</Text>
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
                                    {errors?.duration && <FormErrorMessage>{errors.duration.message}</FormErrorMessage>}
                                </FormControl>
                            </Flex>
                        </Card>
                    );
                })}
                <Button onClick={addExercise}>Add Exercise</Button>
            </Flex>
            <Box mt="auto">{controls}</Box>
        </Flex>
    );
}
