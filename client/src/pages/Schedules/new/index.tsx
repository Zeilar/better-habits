import { Box, Button, Flex, FormControl, FormLabel, FormLabelProps, Grid, Input, Link, Text } from "@chakra-ui/react";
import PageBanner from "../../../components/PageBanner";
import PageWrapper from "../../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import { ArrowLeftShort, CheckCircleFill } from "styled-icons/bootstrap";
import Icon from "../../../components/Icon";
import { days, hourSelection, minuteSelection } from "../../../utils/constants";
import { Controller, useForm, UseFormRegister } from "react-hook-form";
import { Day } from "../../../../@types/date";
import FormError from "../../../components/FormError";
import { apiService } from "../../../services";
import { useAuth, useCSR } from "../../../hooks";
import ComboSelect from "../../../components/ComboSelect";
import Select, { SelectItem } from "../../../components/Select";
import { Program } from "../../../../@types/program";

interface Fields {
    day: Day;
    fromHour: SelectItem;
    fromMinute: SelectItem;
    toHour: SelectItem;
    toMinute: SelectItem;
    programId: SelectItem;
}

interface DayRadioButtonProps {
    day: Day;
    register: UseFormRegister<Fields>;
    active: boolean;
}

function DayRadioButton({ day, register, active }: DayRadioButtonProps) {
    const css: FormLabelProps = active
        ? {
              borderColor: "primary.600",
              color: "primary.600",
          }
        : {
              _hover: {
                  bgColor: "gray.500",
              },
          };
    return (
        <FormLabel
            cursor="pointer"
            boxShadow="card"
            border="2px solid"
            w="100%"
            borderColor="transparent"
            htmlFor={day}
            textTransform="capitalize"
            transition="none"
            bgColor="gray.600"
            rounded="md"
            fontWeight={500}
            userSelect="none"
            pos="relative"
            p={4}
            m={0}
            {...css}
        >
            {day}
            <Input
                hidden
                value={day}
                type="radio"
                id={day}
                {...register("day", { required: "You must pick a day." })}
            />
            {active && (
                <Icon
                    pos="absolute"
                    icon={CheckCircleFill}
                    color="primary.600"
                    transform="translateY(-50%)"
                    right={4}
                    top="50%"
                />
            )}
        </FormLabel>
    );
}

export default function NewSchedule() {
    const { register, handleSubmit, formState, watch, control } = useForm<Fields>({
        defaultValues: {
            day: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format().toLowerCase() as Day,
            fromHour: hourSelection[0],
            fromMinute: minuteSelection[0],
            toHour: hourSelection[0],
            toMinute: minuteSelection[0],
        },
    });
    const { user } = useAuth();
    const programsQuery = useCSR<Program[]>("/programs");

    async function onSubmit(fields: Fields) {
        const { fromHour, fromMinute, toHour, toMinute, programId, ...rest } = fields;
        const response = await apiService.request("/schedules", {
            method: "POST",
            data: {
                userId: user!.id,
                from: `${fromHour.value}:${fromMinute.value}`,
                to: `${toHour.value}:${toMinute.value}`,
                programId: parseInt(programId.value),
                ...rest,
            },
        });
        console.log(response.ok);
    }

    const activeDay = watch("day");

    return (
        <PageWrapper>
            <PageBanner>
                <Link as={ReactLink} to="/schedule" mr={2}>
                    <Icon icon={ArrowLeftShort} size={8} />
                </Link>
                <Text textStyle="h3" as="h3">
                    Create event
                </Text>
            </PageBanner>
            <form onSubmit={handleSubmit(onSubmit)}>
                {programsQuery.success && (
                    <Controller
                        name="programId"
                        control={control}
                        rules={{ required: "Field is required." }}
                        render={({ field, fieldState }) => (
                            <FormControl isInvalid={Boolean(fieldState.error)} px={4} my={4}>
                                <Text textStyle="h3" as="h3" mb={2}>
                                    Program
                                </Text>
                                <ComboSelect
                                    value={field.value}
                                    onChange={field.onChange}
                                    items={programsQuery.data.map(program => ({
                                        value: program.id.toString(),
                                        label: program.name,
                                    }))}
                                />
                                {fieldState.error?.message && <FormError message={fieldState.error.message} />}
                            </FormControl>
                        )}
                    />
                )}
                <Box px={4} mb={4}>
                    <Text textStyle="h3" as="h3" mb={2}>
                        Day
                    </Text>
                    <Grid gridGap={2} gridTemplateColumns="repeat(2, 1fr)">
                        {days.map(day => (
                            <DayRadioButton active={day === activeDay} key={day} day={day} register={register} />
                        ))}
                        <FormControl isInvalid={Boolean(formState.errors.day)}>
                            {formState.errors.day?.message && <FormError message={formState.errors.day.message} />}
                        </FormControl>
                    </Grid>
                </Box>
                <Flex flexDir="column" px={4} mb={4}>
                    <Text textStyle="h3" as="h3" mb={2}>
                        From
                    </Text>
                    <Flex gridGap={2}>
                        <Controller
                            name="fromHour"
                            control={control}
                            rules={{ required: "Field is required." }}
                            render={({ field, fieldState }) => (
                                <FormControl isInvalid={Boolean(fieldState.error)}>
                                    <Select value={field.value} onChange={field.onChange} items={hourSelection} />
                                    {fieldState.error?.message && <FormError message={fieldState.error.message} />}
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="fromMinute"
                            control={control}
                            rules={{ required: "Field is required." }}
                            render={({ field, fieldState }) => (
                                <FormControl isInvalid={Boolean(fieldState.error)}>
                                    <Select value={field.value} onChange={field.onChange} items={minuteSelection} />
                                    {fieldState.error?.message && <FormError message={fieldState.error.message} />}
                                </FormControl>
                            )}
                        />
                    </Flex>
                </Flex>
                <Button type="submit">Submit</Button>
            </form>
        </PageWrapper>
    );
}
