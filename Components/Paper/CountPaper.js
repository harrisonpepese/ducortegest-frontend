import { Paper, Typography, Grid } from "@mui/material";

export default function CountPaper({ title, count }) {
  return (
    <Paper sx={{ width: 200, height:200 }}>
      <Grid container justifyContent="center">
        <Grid padding={2}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid padding={2}>
          <Typography variant="h3">{count}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
