import { Paper } from "@mui/material";

export function BasePaper({ children }) {
  return (
    <Paper sx={{ width: "100%", height: "100%", padding: 1 }} elevation={2}>
      {children}
    </Paper>
  );
}
