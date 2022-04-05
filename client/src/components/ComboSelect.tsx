import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { Box, Button, Input } from "@chakra-ui/react";
import Icon from "./Icon";
import { Selector } from "@styled-icons/heroicons-outline/Selector";
import { SelectItem } from "./Select";

interface Props {
    items: SelectItem[];
    value: SelectItem;
    onChange(item: SelectItem): void;
}

export default function ComboSelect({ items, value, onChange }: Props) {
    function onChangeHandler(item: SelectItem) {
        onChange(item);
    }

    const [query, setQuery] = useState("");

    const filtered =
        query === "" ? items : items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));

    return (
        <Combobox value={value} onChange={onChangeHandler} as={Box} pos="relative" fontWeight={500}>
            <Combobox.Input
                as={Input}
                displayValue={(item: SelectItem) => item.label}
                onChange={event => setQuery(event.target.value)}
                fontWeight={500}
                boxShadow="card"
                _focus={{ borderColor: "transparent" }}
            />
            <Combobox.Button as={Button} variant="unstyled" pos="absolute" right={4}>
                <Icon size={4} icon={Selector} />
            </Combobox.Button>
            <Combobox.Options
                as={Box}
                minW="100%"
                w="fit-content"
                pos="absolute"
                zIndex={10}
                top="2.65rem"
                boxShadow="card"
                maxH="30vh"
                overflowY="auto"
            >
                {filtered.map((item, i) => (
                    <Combobox.Option
                        as={Box}
                        key={i}
                        value={item}
                        cursor="pointer"
                        userSelect="none"
                        bgColor="gray.400"
                        zIndex={20}
                        whiteSpace="nowrap"
                        py={2}
                        px={4}
                        _first={{ roundedTop: "md" }}
                        _last={{ roundedBottom: "md" }}
                        _hover={{ bgColor: "gray.200" }}
                    >
                        {item.label}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
}
