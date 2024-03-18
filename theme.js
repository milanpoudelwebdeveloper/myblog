import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";

const theme = extendTheme({
  breakpoints: {
    "1xl": "1440px",
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;
