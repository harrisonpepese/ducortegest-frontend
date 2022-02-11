import { Grid } from "@mui/material";
import BaseLayout from "../../Components/Layout/BaseLayout";
import CountPaper from "../../Components/Paper/CountPaper";

export default function AgendamentoPage() {
  return (
    <BaseLayout title="Agendamentos">
      <Grid container xs={8} justifyContent="center">
        <Grid padding={2}>
          <CountPaper title="Atendidos hoje" count={3}></CountPaper>
        </Grid>
        <Grid padding={2}>
        <CountPaper title="Em atendimento" count={3}></CountPaper>
        </Grid>
      </Grid>
      <Grid container xs={8}>
        aba
      </Grid>
    </BaseLayout>
  );
}
