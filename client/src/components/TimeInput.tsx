import { Input } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

interface Props<Fields> {
    register: UseFormRegister<Fields>;
}

export default function useTimeInput<Fields>({ register }: Props<Fields>) {
    return (
        <div>
            <Input />
            <Input />
        </div>
    );
}
