import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { Listbox } from "@headlessui/react";
import { Selector } from "styled-icons/heroicons-outline";
import Icon from "./Icon";

export interface SelectItem {
    value: string;
    label: string;
}

// @ts-ignore
interface Props extends BoxProps {
    items: SelectItem[];
    value: SelectItem;
    onChange(item: SelectItem): void;
}

export default function Select({ items, value, onChange, ...props }: Props) {
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
            {...props}
        >
            <Listbox.Button
                as={Flex}
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
                <Icon ml={4} size={4} icon={Selector} />
            </Listbox.Button>
            <Listbox.Options
                as={Box}
                w="fit-content"
                minW="100%"
                pos="absolute"
                zIndex={10}
                top="2.65rem"
                rounded="md"
                boxShadow="card"
                maxH="30vh"
                overflowY="auto"
                outline="none"
            >
                {items.map((item, i) => (
                    <Listbox.Option
                        key={i}
                        value={item}
                        as={Box}
                        cursor="pointer"
                        whiteSpace="nowrap"
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
