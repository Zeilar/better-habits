import { Button, ButtonProps } from "@chakra-ui/react";
import { CheckCircleFill } from "@styled-icons/bootstrap/CheckCircleFill";
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
              bgColor: "cyan.main",
              color: "text.default.contrast",
              fontWeight: 600,
          }
        : {
              bgColor: "gray.800",
              fontWeight: 500,
          };
    return (
        <Button
            variant="unstyled"
            boxShadow="card"
            display="flex"
            justifyContent="space-between"
            textTransform="capitalize"
            transition="none"
            rounded="lg"
            userSelect="none"
            textAlign="left"
            m={0}
            paddingInline={4}
            h={12}
            onClick={onToggle}
            {...css}
        >
            {day}
            {active && <Icon ml={4} icon={CheckCircleFill} color={active ? "gray.800" : "cyan.main"} />}
        </Button>
    );
}
