import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    Input,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { useCSR } from "../../hooks";
import { apiService } from "../../services";

interface ExerciseField {
    name: string;
    sets?: string;
    duration?: string;
}

type Fields = { name: string } & { [key: string]: ExerciseField };

export default function SingleProgram() {
    const { id } = useParams<{ id: string }>();
    const { handleSubmit, register, formState } = useForm<Fields>();
    const { data, loading, success, error } = useCSR<Program<true>>(
        `/programs/${id}`
    );
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    function save(fields: Fields) {
        const { name, ...exercises } = fields;
        const parsedExercises = Object.values(exercises).map(exercise => ({
            ...exercise,
            duration: exercise.duration ? parseInt(exercise.duration) : null,
            sets: exercise.sets ? parseInt(exercise.sets) : null,
        }));
        console.log(name, parsedExercises);
    }

    async function destroy() {
        if (!data || !id || error) {
            return;
        }
        setSubmitting(true);
        const response = await apiService.request(`/programs/${id}`, {
            method: "DELETE",
        });
        setSubmitting(false);
        if (response.ok) {
            navigate("/programs");
        }
    }

    if (loading) {
        // TODO: skeleton
        return null;
    }

    return (
        <PageWrapper as="form" onSubmit={handleSubmit(save)}>
            <Text>{data.name}</Text>
            <FormControl isInvalid={Boolean(formState.errors.name)}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    placeholder="Weight lifting"
                    id="name"
                    {...register("name", { required: "Field is required" })}
                />
                {formState.errors.name && (
                    <FormErrorMessage>
                        {formState.errors.name.message}
                    </FormErrorMessage>
                )}
            </FormControl>
            <Text>Exercises</Text>
            {data.exercises.map(({ id }) => {
                const label = `exercise${id}`;
                const name = `${label}.name`;
                const sets = `${label}.sets`;
                const duration = `${label}.duration`;
                const errors = formState.errors[label];
                return (
                    <Flex key={id}>
                        <FormControl isInvalid={Boolean(errors?.name)}>
                            <FormLabel htmlFor={name}>Name</FormLabel>
                            <Input
                                id={name}
                                placeholder="Situps"
                                {...register(name, {
                                    required: "Field is required",
                                })}
                            />
                            {errors?.name && (
                                <FormErrorMessage>
                                    {errors.name.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={Boolean(errors?.sets)}>
                            <FormLabel htmlFor={sets}>Sets</FormLabel>
                            <Input
                                id={sets}
                                placeholder="Sets"
                                {...register(sets)}
                            />
                            {errors?.sets && (
                                <FormErrorMessage>
                                    {errors.sets.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={Boolean(errors?.duration)}>
                            <FormLabel htmlFor={duration}>Duration</FormLabel>
                            <Input
                                id={duration}
                                placeholder="Duration"
                                {...register(duration)}
                            />
                            {errors?.duration && (
                                <FormErrorMessage>
                                    {errors.duration.message}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </Flex>
                );
            })}
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
