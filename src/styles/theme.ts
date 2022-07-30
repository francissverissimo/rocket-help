import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: {
      700: "#3AB0FF", // light-blue
    },
    secondary: {
      700: "#F15412", // orange
    },
    green: {
      700: "#3d7aff",
      500: "#2772db",
      300: "#04D361",
    },
    gray: {
      700: "#121214",
      600: "#202024",
      500: "#29292E",
      400: "#323238",
      300: "#7C7C8A",
      200: "#C4C4CC",
      100: "#E1E1E6",
    },
    white: "#FFFFFF",
  },
  fonts: {
    heading: "Roboto_700Bold",
    body: "Roboto_400Regular",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
