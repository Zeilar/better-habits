import { Flex, Link } from "@chakra-ui/react";
import Icon from "./Icon";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import type { StyledIcon } from "@styled-icons/styled-icon";
import { Home as HomeOutline } from "@styled-icons/ionicons-outline/Home";
import { Home } from "@styled-icons/ionicons-solid/Home";
import { Dumbbell as DumbbellOutline } from "@styled-icons/fluentui-system-regular/Dumbbell";
import { Dumbbell } from "@styled-icons/fluentui-system-filled/Dumbbell";
import { ClipboardBulletListLtr as ClipboardBulletListLtrOutline } from "@styled-icons/fluentui-system-regular/ClipboardBulletListLtr";
import { ClipboardBulletListLtr } from "@styled-icons/fluentui-system-filled/ClipboardBulletListLtr";
import { Cog as CogOutline } from "@styled-icons/boxicons-regular/Cog";
import { Cog } from "@styled-icons/boxicons-solid/Cog";

interface NavitemProps {
    href: string;
    icon: StyledIcon;
    activeIcon: StyledIcon;
}

function Navitem({ icon, activeIcon, href }: NavitemProps) {
    const resolved = useResolvedPath(href);
    const match = useMatch({ path: resolved.pathname, end: true });
    return (
        <Link
            fontSize="0.75rem"
            transition="none"
            display="flex"
            justifyContent="center"
            alignItems="center"
            as={NavLink}
            to={href}
            w="100%"
            h="100%"
            color="text.defaultContrast"
            p={2}
            fontWeight={400}
            _hover={{ color: "blue.500" }}
            _activeLink={{
                color: "blue.500",
            }}
        >
            <Icon icon={match ? activeIcon : icon} w={6} h={6} />
        </Link>
    );
}

export default function Navbar() {
    return (
        <Flex
            h="navbarHeight"
            pos="sticky"
            bottom={0}
            zIndex={1000}
            as="nav"
            boxShadow="elevate.top"
            alignItems="center"
            justifyContent="space-between"
            bgColor="white.900"
        >
            <Navitem href="/" icon={HomeOutline} activeIcon={Home} />
            <Navitem href="/programs" icon={DumbbellOutline} activeIcon={Dumbbell} />
            <Navitem href="/schedule" icon={ClipboardBulletListLtrOutline} activeIcon={ClipboardBulletListLtr} />
            <Navitem href="/settings" icon={CogOutline} activeIcon={Cog} />
        </Flex>
    );
}
