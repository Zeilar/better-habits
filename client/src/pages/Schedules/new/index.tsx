import { Box, Button, ButtonProps, Flex, FormControl, Grid, Link, Text } from "@chakra-ui/react";
import PageBanner from "../../../components/PageBanner";
import PageWrapper from "../../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import { ArrowLeftShort, CheckCircleFill } from "styled-icons/bootstrap";
import Icon from "../../../components/Icon";
import { days, hourSelection, minuteSelection } from "../../../utils/constants";
import { Controller, useForm } from "react-hook-form";
import { Day } from "../../../../@types/date";
import FormError from "../../../components/FormError";
import { apiService } from "../../../services";
import { useAuth, useCSR } from "../../../hooks";
import ComboSelect from "../../../components/ComboSelect";
import Select, { SelectItem } from "../../../components/Select";
import { Program } from "../../../../@types/program";

interface Fields {
    days: Day[];
    fromHour: SelectItem;
    fromMinute: SelectItem;
    toHour: SelectItem;
    toMinute: SelectItem;
    programId: SelectItem;
}

interface DayRadioButtonProps {
    day: Day;
    active: boolean;
    onToggle(): void;
}

function DayRadioButton({ day, active, onToggle }: DayRadioButtonProps) {
    const css: ButtonProps = active
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
        <Button
            variant="unstyled"
            boxShadow="card"
            display="flex"
            justifyContent="space-between"
            border="2px solid"
            borderColor="transparent"
            textTransform="capitalize"
            transition="none"
            bgColor="gray.600"
            rounded="md"
            fontWeight={500}
            userSelect="none"
            textAlign="left"
            m={0}
            paddingInline={4}
            h={12}
            onClick={onToggle}
            {...css}
        >
            {day}
            {active && <Icon ml={4} icon={CheckCircleFill} color="primary.600" />}
        </Button>
    );
}

export default function NewSchedule() {
    const { handleSubmit, control } = useForm<Fields>({
        defaultValues: {
            days: [new Intl.DateTimeFormat("en-US", { weekday: "long" }).format().toLowerCase() as Day],
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
        console.log({
            userId: user!.id,
            from: `${fromHour.value}:${fromMinute.value}`,
            to: `${toHour.value}:${toMinute.value}`,
            programId: parseInt(programId.value),
            ...rest,
        });
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

    return (
        <PageWrapper noScroll>
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
                <Flex flexDir="column" px={4} mb={4}>
                    <Text textStyle="h3" as="h3" mb={2}>
                        To
                    </Text>
                    <Flex gridGap={2}>
                        <Controller
                            name="toHour"
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
                            name="toMinute"
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
                <Box px={4} mb={4}>
                    <Text textStyle="h3" as="h3" mb={2}>
                        Day
                    </Text>
                    <Controller
                        name="days"
                        control={control}
                        rules={{ required: "Field is required" }}
                        render={({ field, fieldState }) => {
                            function onToggle(day: Day) {
                                field.onChange(
                                    field.value.includes(day)
                                        ? field.value.filter(value => value !== day)
                                        : [...field.value, day]
                                );
                            }
                            return (
                                <FormControl as={Grid} gridGap={2} isInvalid={Boolean(fieldState.error)}>
                                    {days.map((day, i) => (
                                        <DayRadioButton
                                            onToggle={() => onToggle(day)}
                                            day={day}
                                            key={i}
                                            active={field.value.includes(day)}
                                        />
                                    ))}
                                </FormControl>
                            );
                        }}
                    />
                </Box>
                <Grid
                    pos="sticky"
                    bottom={0}
                    gridTemplateColumns="repeat(2, 1fr)"
                    boxShadow="elevate.top"
                    bgColor="gray.600"
                    p={4}
                    gridGap={4}
                    h="controlsHeight"
                >
                    <Button type="submit">Create</Button>
                    <Link as={ReactLink} to="/programs" display="flex">
                        <Text m="auto">Cancel</Text>
                    </Link>
                </Grid>
            </form>
        </PageWrapper>
    );
}
