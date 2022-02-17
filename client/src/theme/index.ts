import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import * as components from "./components";
import { config } from "./config";
import { fonts } from "./fonts";
import { shadows } from "./shadows";
import { styles } from "./styles";
import { withDefaults } from "./withDefaults";
// import { breakpoints } from "./breakpoints";
import { textStyles } from "./textStyles";
import { radii } from "./radii";
import { sizes } from "./sizes";

export default extendTheme(
    {
        sizes,
        config,
        colors,
        shadows,
        fonts,
        components: { ...chakraTheme.components, ...components },
        styles,
        // breakpoints,
        textStyles,
        radii,
    },
    textStyles,
    ...withDefaults
);
