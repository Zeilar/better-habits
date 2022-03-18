import { Box, Flex } from "@chakra-ui/react";
import { Listbox } from "@headlessui/react";
import { Selector } from "styled-icons/heroicons-outline";
import Icon from "./Icon";

export interface SelectItem {
    value: string;
    label: string;
}

interface Props {
    items: SelectItem[];
    value: SelectItem;
    onChange(item: SelectItem): void;
}

export default function Select({ items, value, onChange }: Props) {
    function onChangeHandler(item: SelectItem) {
        onChange(item);
    }

    return (
        <Listbox
            value={value}
            onChange={onChangeHandler}
            as={Box}
            fontWeight={500}
            pos="relative"
            userSelect="none"
            _focus={{ bg: "red" }}
        >
            <Listbox.Button
                as={Flex}
                w="100%"
                textAlign="left"
                py={2}
                px={4}
                bgColor="gray.600"
                rounded="md"
                justifyContent="space-between"
                alignItems="center"
                boxShadow="card"
                cursor="pointer"
                zIndex={20}
                _hover={{ bgColor: "gray.500" }}
                _focus={{ bg: "red" }}
            >
                {value.label}
                <Icon size={4} icon={Selector} />
            </Listbox.Button>
            <Listbox.Options
                as={Box}
                w="100%"
                pos="absolute"
                zIndex={10}
                top="2.65rem"
                rounded="md"
                boxShadow="card"
                maxH="20vh"
                overflowY="auto"
                outline="none"
            >
                {items.map((item, i) => (
                    <Listbox.Option
                        key={i}
                        value={item}
                        as={Box}
                        cursor="pointer"
                        py={2}
                        px={4}
                        bgColor="gray.600"
                        _first={{ roundedTop: "md" }}
                        _last={{ roundedBottom: "md" }}
                        _hover={{ bgColor: "gray.500", color: "primary.600" }}
                    >
                        {item.label}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
}
