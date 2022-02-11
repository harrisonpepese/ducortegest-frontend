import {
    Grid,
    Typography,
  } from "@mui/material";
  
  export default function BaseLayout({children,title}) {
    return (
      <Grid container marginTop={2} justifyContent="center">
        <Grid xs={10} marginBottom={3}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        {children}
      </Grid>
    );
  }
  