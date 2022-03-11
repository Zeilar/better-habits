import { Box, Button, FormControl, FormLabel, FormLabelProps, Grid, Input, Link, Text } from "@chakra-ui/react";
import PageBanner from "../../../components/PageBanner";
import PageWrapper from "../../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import { ArrowLeftShort, CheckCircleFill, Circle } from "styled-icons/bootstrap";
import Icon from "../../../components/Icon";
import { days } from "../../../utils/constants";
import { useForm, UseFormRegister } from "react-hook-form";
import { Day } from "../../../../@types/date";
import FormError from "../../../components/FormError";

interface Fields {
    day?: Day;
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

export default function NewSchedule() {
    const { register, handleSubmit, formState, watch } = useForm<Fields>();

    function onSubmit(fields: Fields) {
        console.log(fields);
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
                <Button type="submit">Submit</Button>
            </form>
        </PageWrapper>
    );
}
