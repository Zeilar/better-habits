import { IconProps, Icon as ChakraIcon } from "@chakra-ui/icon";
import type { StyledIcon } from "@styled-icons/styled-icon";

interface Props extends IconProps {
    /**
     * The full path to the icon excluding `@styled-icons`
     */
    icon: StyledIcon;
    size?: number | string; // For some reason TS doesn't think this exists on IconProps
}

export default function Icon({ icon, ...props }: Props) {
    return <ChakraIcon as={icon} minW={4} minH={4} verticalAlign="middle" {...props} />;
}
