import { IconProps, Icon as ChakraIcon } from "@chakra-ui/icon";
import * as Icons from "../assets/svg";

interface Props extends IconProps {
    /**
     * The name of the svg file excluding file extension
     */
    icon: keyof typeof Icons;
    size?: number | string; // For some reason TS doesn't think this exists on IconProps
}

export default function AssetIcon({ icon, ...props }: Props) {
    return <ChakraIcon as={Icons[icon]} w="100%" h="100%" verticalAlign="middle" {...props} />;
}
