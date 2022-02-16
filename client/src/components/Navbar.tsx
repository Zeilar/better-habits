import { Flex, Link, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks";
import Icon, { MdiIcon } from "./Icon";
import { NavLink as ReactLink } from "react-router-dom";

interface NavitemProps {
    label: string;
    icon: MdiIcon;
    href: string;
}

function Navitem({ label, icon, href }: NavitemProps) {
    return (
        <Link
            fontSize="0.75rem"
            as={ReactLink}
            w="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
            color={"text.default"}
            py={3}
            px={4}
            pos="relative"
            to={href}
            _hover={{ bgColor: "gray.400" }}
            _after={{
                display: "none",
                content: `""`,
                pos: "absolute",
                top: 0,
                left: 0,
                w: "100%",
                h: "2px",
                bgColor: "primary.600",
            }}
            _activeLink={{
                color: "primary.600",
                bgColor: "transparent",
                _after: { display: "block " },
            }}
        >
            <Icon icon={icon} w={6} h={6} mb={1} />
            <Text fontWeight={600}>{label}</Text>
        </Link>
    );
}

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <Flex
            boxShadow="elevate.top"
            alignItems="center"
            h="navbarHeight"
            as="nav"
            bgColor="gray.800"
            pos="sticky"
            bottom={0}
            justifyContent="center"
        >
            <Navitem href="/" label="Home" icon="mdiHome" />
            <Navitem href="/programs" label="Programs" icon="mdiDumbbell" />
            <Navitem href="/schedule" label="Schedule" icon="mdiCalendar" />
            <Navitem href="/settings" label="Settings" icon="mdiCog" />
        </Flex>
    );
}
