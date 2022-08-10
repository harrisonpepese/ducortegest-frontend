import { CircularProgress, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function Loading() {
  return (
    <Box
      sx={{ display: "flex", width: "100%", height: "50vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}
