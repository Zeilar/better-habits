import { Button, ButtonProps } from "@chakra-ui/react";
import { CheckCircleFill } from "styled-icons/bootstrap";
import { Day } from "../../../../@types/date";
import Icon from "../../../components/Icon";

interface DayRadioButtonProps {
    day: Day;
    active: boolean;
    onToggle(): void;
}

export default function DayRadioButton({ day, active, onToggle }: DayRadioButtonProps) {
    const css: ButtonProps = active
        ? {
              borderColor: "primary.600",
          }
        : {};
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
            bgColor="gray.400"
            rounded="md"
            fontWeight={500}
            userSelect="none"
            textAlign="left"
            m={0}
            paddingInline={4}
            h={12}
            onClick={onToggle}
            _hover={{ bgColor: "gray.200" }}
            {...css}
        >
            {day}
            {active && <Icon ml={4} icon={CheckCircleFill} color="primary.600" />}
        </Button>
    );
}
