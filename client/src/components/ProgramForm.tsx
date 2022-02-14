import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Program } from "../../@types/program";
import ContainerSpinner from "./ContainerSpinner";
import PageWrapper from "./PageWrapper";

interface ExerciseField {
    name: string;
    sets?: number;
    duration?: number;
}

type Fields = { name: string; exercises: ExerciseField[] };

interface Props {
    program?: Program<true>;
}

export default function ProgramForm({ program }: Props) {
    const { handleSubmit, register, formState, getValues, control } = useForm<Fields>();
    const exercises = useFieldArray({ name: "exercises", control });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function save(fields: any) {
        // const { name, ...exercises } = fields;
        // const parsedExercises = Object.values(exercises).map(exercise => ({
        //     ...exercise,
        //     duration: exercise.duration ? parseInt(exercise.duration) : null,
        //     sets: exercise.sets ? parseInt(exercise.sets) : null,
        // }));
        // await apiService.request(`/programs/${id}`, {
        //     method: "PUT",
        //     data: { program: { name }, exercises: parsedExercises },
        // });
    }

    async function destroy() {
        // setSubmitting(true);
        // const response = await apiService.request(`/programs/${id}`, {
        //     method: "DELETE",
        // });
        // setSubmitting(false);
        // if (response.ok) {
        //     navigate("/programs");
        // }
    }

    console.log(formState.errors);

    return (
        <PageWrapper as="form" onSubmit={handleSubmit(save)}>
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
            <Button onClick={() => console.table(getValues("exercises"))}>VALUES</Button>
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
            <Grid
                boxShadow="elevate.top"
                bgColor="gray.600"
                gridTemplateColumns="repeat(2, 1fr)"
                pos="sticky"
                bottom="var(--chakra-sizes-navbarHeight)"
                mt="auto"
                gridGap={4}
                p={4}
            >
                <Button type="submit">Save</Button>
                <Button variant="danger" onClick={destroy} type="button">
                    Delete
                </Button>
            </Grid>
        </PageWrapper>
    );
}
