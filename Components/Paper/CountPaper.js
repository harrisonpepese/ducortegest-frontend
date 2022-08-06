import { Paper, Typography, Grid } from "@mui/material";

export default function CountPaper({ title, count }) {
  return (
    <Paper sx={{ width: "100%", height: 200 }}>
      <Grid container justifyContent="center" justifyItems="center">
        <Grid padding={2} xs={12}>
          <Typography align="center" variant="h6">
            {title}
          </Typography>
        </Grid>
        <Grid padding={2} xs={12}>
          <Typography align="center" variant="h3">
            {count}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
