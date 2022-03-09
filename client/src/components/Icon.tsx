import { IconProps, Icon as ChakraIcon } from "@chakra-ui/icon";
import type { StyledIcon } from "@styled-icons/styled-icon";

interface Props extends IconProps {
    /**
     * The full path to the icon excluding `@styled-icons`
     */
    icon: StyledIcon;
    size?: number;
}

export default function Icon({ icon, size, ...props }: Props) {
    return <ChakraIcon as={icon} minW={4} minH={4} w={size} h={size} verticalAlign="middle" {...props} />;
}
