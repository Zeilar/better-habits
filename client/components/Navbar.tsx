import { Button, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAuth } from "../hooks";
import Icon, { MdiIcon } from "./Icon";
import { useRouter } from "next/router";

interface NavitemProps {
    label: string;
    icon: MdiIcon;
    active: boolean;
    href: string;
}

function Navitem({ label, icon, active, href }: NavitemProps) {
    return (
        <NextLink href={href} passHref>
            <Link
                as={Flex}
                w="100%"
                flexDir="column"
                alignItems="center"
                color={active ? "primary.400" : "text.default"}
                py="0.5rem"
                px="1rem"
                pos="relative"
                _hover={{ color: "primary.400" }}
                _after={{
                    display: active ? "block" : "none",
                    content: `""`,
                    pos: "absolute",
                    top: 0,
                    left: 0,
                    w: "100%",
                    h: "2px",
                    bgColor: "primary.400",
                }}
            >
                <Icon icon={icon} w="1.5rem" h="1.5rem" mb="0.25rem" />
                <Text fontWeight={600}>{label}</Text>
            </Link>
        </NextLink>
    );
}

export default function Navbar() {
    const { logout } = useAuth();
    const router = useRouter();

    return (
        <Flex
            as="nav"
            mt="auto"
            gridTemplateColumns="repeat(1, 1fr)"
            bgColor="gray.700"
            w="100%"
        >
            <Navitem href="/" label="Home" icon="mdiHome" active={true} />
            <Navitem
                href="/programs"
                label="Programs"
                icon="mdiDumbbell"
                active={false}
            />
        </Flex>
    );
}
