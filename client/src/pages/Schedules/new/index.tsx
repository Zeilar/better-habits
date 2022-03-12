import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    FormLabelProps,
    Grid,
    Input,
    Link,
    Select,
    Text,
} from "@chakra-ui/react";
import PageBanner from "../../../components/PageBanner";
import PageWrapper from "../../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import { ArrowLeftShort, CheckCircleFill, Circle } from "styled-icons/bootstrap";
import Icon from "../../../components/Icon";
import { days, numberMinuteOptions } from "../../../utils/constants";
import { useForm, UseFormRegister } from "react-hook-form";
import { Day } from "../../../../@types/date";
import FormError from "../../../components/FormError";

interface Fields {
    day?: Day;
    fromHour: string;
    fromMinute: string;
    toHour: string;
    toMinute: string;
}

interface DayRadioButtonProps {
    day: Day;
    register: UseFormRegister<Fields>;
    active: boolean;
}

function DayRadioButton({ day, register, active }: DayRadioButtonProps) {
    const activeStyling: FormLabelProps = active
        ? {
              borderColor: "primary.600",
              color: "primary.600",
          }
        : {};
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
            bgColor="gray.700"
            rounded="md"
            fontWeight={600}
            pos="relative"
            p={4}
            m={0}
            {...activeStyling}
        >
            {day}
            <Input
                hidden
                value={day}
                type="radio"
                id={day}
                {...register("day", { required: "You must pick a day." })}
            />
            <Icon
                pos="absolute"
                icon={active ? CheckCircleFill : Circle}
                color={active ? "primary.600" : "border.default"}
                right={2}
                top={2}
            />
        </FormLabel>
    );
}

function HourOptions() {
    return (
        <>
            {Array(24)
                .fill(null)
                .map((_, i) => {
                    const number = i < 10 ? `0${i}` : i;
                    return (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    );
                })}
        </>
    );
}

function MinuteOptions() {
    return (
        <>
            {numberMinuteOptions.map(number => (
                <option key={number} value={number}>
                    {number}
                </option>
            ))}
        </>
    );
}

export default function NewSchedule() {
    const { register, handleSubmit, formState, watch } = useForm<Fields>();

    function onSubmit(fields: Fields) {
        const { fromHour, fromMinute, toHour, toMinute, ...rest } = fields;
        const from = `${fromHour}:${fromMinute}`;
        const to = `${toHour}:${toMinute}`;
        console.log({ ...rest, from, to });
    }

    const activeDay = watch("day");

    return (
        <PageWrapper>
            <PageBanner mb={4}>
                <Link as={ReactLink} to="/schedule" mr={2}>
                    <Icon icon={ArrowLeftShort} size={8} />
                </Link>
                <Text textStyle="h3" as="h3">
                    Create event
                </Text>
            </PageBanner>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box p={4}>
                    <Text textStyle="h3" as="h3" mb={4}>
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
                <Flex>
                    <Select {...register("toHour")}>
                        <HourOptions />
                    </Select>
                    <Select {...register("toMinute")}>
                        <MinuteOptions />
                    </Select>
                </Flex>
                <Flex>
                    <Select {...register("fromHour")}>
                        <HourOptions />
                    </Select>
                    <Select {...register("fromMinute")}>
                        <MinuteOptions />
                    </Select>
                </Flex>
                <Button type="submit">Submit</Button>
            </form>
        </PageWrapper>
    );
}
