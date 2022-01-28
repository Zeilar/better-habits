import { IconProps, Icon as ChakraIcon } from "@chakra-ui/react";
import * as MdiIcons from "@mdi/js";
import _Icon from "@mdi/react";

export type MdiIcon = keyof typeof MdiIcons;

interface Props extends IconProps {
    icon?: MdiIcon;
}

export default function Icon({ icon, ...props }: Props) {
    return icon ? (
        <ChakraIcon
            as={_Icon}
            path={MdiIcons[icon]}
            minW={4}
            minH={4}
            verticalAlign="middle"
            {...props}
        />
    ) : null;
}
