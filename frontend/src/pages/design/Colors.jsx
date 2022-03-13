import { createTheme } from "@mui/material/styles";

const theme = createTheme({});

export default {
  BLUE: "rgb(0,120,196)",
  PINK: "rgb(246,0,223)",
  WHITE: "#FFF",
  TILE_TYPES: {
    BLUE: theme.palette.primary.light,
    PURPLE: theme.palette.secondary.light,
    RED: theme.palette.error.light,
    ORANGE: theme.palette.warning.light,
    GREEN: theme.palette.success.light,
  },
};
