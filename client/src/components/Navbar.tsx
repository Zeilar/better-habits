import { Flex, Link, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks";
import Icon from "./Icon";
import { NavLink } from "react-router-dom";
import type { StyledIcon } from "@styled-icons/styled-icon";
import { Home } from "styled-icons/ionicons-outline";
import { Dumbbell } from "styled-icons/fluentui-system-regular";
import { ClipboardBulletListLtr } from "styled-icons/fluentui-system-regular";
import { Cog, UserPlus } from "styled-icons/boxicons-regular";
import { SignIn } from "styled-icons/octicons";

interface NavitemProps {
    label: string;
    href: string;
    icon: StyledIcon;
}

function Navitem({ label, icon, href }: NavitemProps) {
    return (
        <Link
            fontSize="0.75rem"
            as={NavLink}
            w="100%"
            display="flex"
            flexDir="column"
            alignItems="center"
            color={"text.default"}
            py={3}
            px={4}
            pos="relative"
            to={href}
            _hover={{ color: "primary.600" }}
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
                _after: { display: "block" },
            }}
        >
            <Icon icon={icon} w={6} h={6} mb={1} />
            <Text fontWeight={600}>{label}</Text>
        </Link>
    );
}

export default function Navbar() {
    const { authenticated } = useAuth();

    return (
        <Flex
            as="nav"
            boxShadow="elevate.top"
            alignItems="center"
            justifyContent="center"
            h="navbarHeight"
            bgColor="gray.600"
            pos="sticky"
            bottom={0}
            zIndex={1000}
        >
            {authenticated ? (
                <>
                    <Navitem href="/" label="Home" icon={Home} />
                    <Navitem href="/programs" label="Programs" icon={Dumbbell} />
                    <Navitem href="/schedule" label="Schedule" icon={ClipboardBulletListLtr} />
                    <Navitem href="/settings" label="Settings" icon={Cog} />
                </>
            ) : (
                <>
                    <Navitem href="/guest" label="Welcome" icon={Home} />
                    <Navitem href="/register" label="Register" icon={UserPlus} />
                    <Navitem href="/login" label="Login" icon={SignIn} />
                </>
            )}
        </Flex>
    );
}
