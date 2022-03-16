import { Box, Flex, Grid } from "@chakra-ui/react";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { Selector } from "styled-icons/heroicons-outline";
import Icon from "./Icon";

interface Item {
    value: string;
    label: string;
}

interface Props {
    items: Item[];
}

export default function Select({ items }: Props) {
    const [selected, setSelected] = useState(items[0]);

    return (
        <Listbox
            value={selected}
            onChange={setSelected}
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
                bgColor="gray.700"
                rounded="md"
                justifyContent="space-between"
                alignItems="center"
                boxShadow="card"
                cursor="pointer"
                zIndex={20}
                _hover={{ bgColor: "gray.500" }}
                _focus={{ bg: "red" }}
            >
                {selected.label}
                <Icon size={4} icon={Selector} />
            </Listbox.Button>
            <Listbox.Options as={Box} w="100%" pos="absolute" zIndex={10} top="2.65rem" rounded="md" boxShadow="card">
                {items.map((item, i) => (
                    <Listbox.Option
                        key={i}
                        value={item}
                        as={Box}
                        cursor="pointer"
                        py={2}
                        px={4}
                        bgColor="gray.700"
                        _first={{ roundedTop: "md" }}
                        _last={{ roundedBottom: "md" }}
                        _hover={{ bgColor: "gray.500" }}
                    >
                        {item.label}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
}
