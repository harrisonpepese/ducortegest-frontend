import { Paper, Stack } from "@mui/material";

export default function ButtonPaper({ children }) {
  return (
    <Paper sx={{ width: "100%", padding: 1 }} elevation={2}>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Stack>
    </Paper>
  );
}
