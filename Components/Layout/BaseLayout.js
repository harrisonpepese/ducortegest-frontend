import { Grid, Typography } from "@mui/material";
import Loading from "../Loading";

export default function BaseLayout({ children, title, loading }) {
  return (
    <Grid container padding={2} justifyContent="center">
      <Grid xs={12}>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      {loading ? <Loading /> : children}
    </Grid>
  );
}
