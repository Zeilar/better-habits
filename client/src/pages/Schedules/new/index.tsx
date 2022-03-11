import { Button, FormControl, FormLabel, FormLabelProps, Grid, Input, Link, Text } from "@chakra-ui/react";
import PageBanner from "../../../components/PageBanner";
import PageWrapper from "../../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import { ArrowLeftShort } from "styled-icons/bootstrap";
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
          }
        : {};
    return (
        <FormLabel
            boxShadow="card"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid"
            borderColor="transparent"
            w="100%"
            htmlFor={day}
            textTransform="capitalize"
            bgColor="gray.700"
            rounded="md"
            m={0}
            h={16}
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
        </FormLabel>
    );
}

export default function NewSchedule() {
    const { register, handleSubmit, formState, watch } = useForm<Fields>();

    function onSubmit(fields: Fields) {
        console.log(fields);
    }

    const activeDay = watch("day");

    console.log("formState error:", formState.errors.day?.message);

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
                <Text>Day</Text>
                <Grid gridGap={2} p={4}>
                    {days.map(day => (
                        <DayRadioButton active={day === activeDay} key={day} day={day} register={register} />
                    ))}
                    <FormControl isInvalid={Boolean(formState.errors.day)}>
                        {formState.errors.day?.message && <FormError message={formState.errors.day.message} />}
                    </FormControl>
                </Grid>
                <Button type="submit">Submit</Button>
            </form>
        </PageWrapper>
    );
}
