import { Button, Grid, Stack } from "@mui/material";
import BaseLayout from "../Components/Layout/BaseLayout";
import CountPaper from "../Components/Paper/CountPaper";

export default function Home() {
  return (
    <BaseLayout title={"Dashboard"}>
      <Grid xs={8} container justifyContent="space-between">
        <Grid>
          <Button variant="contained">Novo Cliente</Button>
        </Grid>
        <Grid>
          <Button variant="contained">Novo Atendimento</Button>
        </Grid>
        <Grid>
          <Button variant="contained">Novo Serviço</Button>
        </Grid>
      </Grid>
      <Grid container xs={10} spacing={4} margin={2}>
        <Grid item>
          <CountPaper title="Agendamento Hoje" count={0}></CountPaper>
        </Grid>
        <Grid item>
          <CountPaper title="Agendamento Aguardando" count={0}></CountPaper>
        </Grid>
        <Grid item>
          <CountPaper title="Serviços por cliente" count={0}></CountPaper>
        </Grid>
        <Grid item>
          <CountPaper title="Serviços efetuados" count={0}></CountPaper>
        </Grid>
        <Grid item>
          <CountPaper title="Clientes Atendidos" count={0}></CountPaper>
        </Grid>
        <Grid item>
          <CountPaper title="Clientes novos" count={0}></CountPaper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
