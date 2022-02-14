import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { Program } from "../../@types/program";
import ContainerSpinner from "./ContainerSpinner";
import PageWrapper from "./PageWrapper";

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

    return (
        <PageWrapper as="form" onSubmit={handleSubmit(onSubmit)}>
            {(submitting || formState.isSubmitting) && <ContainerSpinner />}
            <Text>{program?.name}</Text>
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
                    <Flex key={i}>
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
                        <Button onClick={() => exercises.remove(i)}>X</Button>
                    </Flex>
                );
            })}
            <Button onClick={() => exercises.append({ duration: 0, sets: 0, name: "" })}>Add</Button>
            {controls}
        </PageWrapper>
    );
}
