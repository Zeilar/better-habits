import { IconProps, Icon as ChakraIcon } from "@chakra-ui/icon";
import * as Icons from "../assets/svg";

interface Props extends IconProps {
    /**
     * The name of the svg file excluding file extension
     */
    icon: keyof typeof Icons;
    size?: number | string;
}

export default function AssetIcon({ icon, size, ...props }: Props) {
    return <ChakraIcon as={Icons[icon]} w={size} h={size} maxW="100%" maxH="100%" verticalAlign="middle" {...props} />;
}
