// In your theme.js or wherever you define your Chakra UI theme
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Roboto, sans-serif", // Change "Roboto" to your chosen font
    heading: "Roboto, sans-serif", // You can specify different fonts for headings if needed
  },
});

export default theme;
