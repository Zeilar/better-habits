import { Box, Button, Flex, FormControl, Grid, Link, Text } from "@chakra-ui/react";
import PageWrapper from "../../../components/PageWrapper";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { BRAND_NAME, days, hourSelection, minuteSelection } from "../../../utils/constants";
import { Controller, useForm } from "react-hook-form";
import { Day } from "../../../../@types/date";
import FormError from "../../../components/FormError";
import { apiService } from "../../../services";
import { useAuth, useCSR, useToast } from "../../../hooks";
import { useTitle } from "@zeilar/hooks";
import ComboSelect from "../../../components/ComboSelect";
import Select, { SelectItem } from "../../../components/Select";
import { Program } from "../../../../@types/program";
import DayRadioButton from "./DayRadioButton";

interface Fields {
    days: Day[];
    fromHour: SelectItem;
    fromMinute: SelectItem;
    toHour: SelectItem;
    toMinute: SelectItem;
    programId: SelectItem;
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
    const navigate = useNavigate();
    const toast = useToast();
    useTitle(`Create event | ${BRAND_NAME}`);

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
        if (response.ok) {
            navigate("/schedule");
        } else {
            toast({ title: "Something went wrong", status: "error" });
        }
    }

    return (
        <PageWrapper noScroll>
            <Text textStyle="pageTitle" p={4}>
                Create event
            </Text>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                {programsQuery.success && (
                    <Controller
                        name="programId"
                        control={control}
                        rules={{ required: "Please pick a program" }}
                        render={({ field, fieldState }) => (
                            <FormControl isInvalid={Boolean(fieldState.error)} px={4} my={4}>
                                <Text textStyle="h4" mb={2}>
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
                    <Text textStyle="h4" mb={2}>
                        From
                    </Text>
                    <Flex gridGap={2}>
                        <Controller
                            name="fromHour"
                            control={control}
                            rules={{ required: "Field is required" }}
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
                            rules={{ required: "Field is required" }}
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
                    <Text textStyle="h4" mb={2}>
                        To
                    </Text>
                    <Flex gridGap={2}>
                        <Controller
                            name="toHour"
                            control={control}
                            rules={{ required: "Field is required" }}
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
                            rules={{ required: "Field is required" }}
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
                    <Text textStyle="h4" mb={2}>
                        Day
                    </Text>
                    <Controller
                        name="days"
                        control={control}
                        rules={{ required: "Please pick at least one day" }}
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
                                    {fieldState.error?.message && <FormError message={fieldState.error.message} />}
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
                    bgColor="gray.800"
                    p={4}
                    gridGap={4}
                    h="controlsHeight"
                >
                    <Button type="submit">Create</Button>
                    <Link as={ReactLink} to="/schedule" display="flex" w="100%">
                        <Text m="auto" color="white.900">
                            Cancel
                        </Text>
                    </Link>
                </Grid>
            </Box>
        </PageWrapper>
    );
}
