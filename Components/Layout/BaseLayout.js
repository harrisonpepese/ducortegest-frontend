import { Grid, Typography } from "@mui/material";

export default function BaseLayout({ children, title }) {
  return (
    <Grid container padding={2} justifyContent="center">
      <Grid xs={12}>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      {children}
    </Grid>
  );
}
