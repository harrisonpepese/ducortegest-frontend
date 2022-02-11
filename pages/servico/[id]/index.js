import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../src/axios";

export default function FuncionarioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [servico, setServico] = useState({});
  const gotoEdit = ()=>{
      router.push(`${id}/edit`)
  }
  useEffect(() => {
    http
      .get(`servico/${id}`)
      .then((res) => setServico(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, []);
  return (
    <BaseLayout title="Serviço">
      <Grid container xs={8} justifyContent="Center">
        <Button onClick={()=>{gotoEdit()}} variant="contained">Editar serviço</Button>
      </Grid>
      <Grid container xs={8} marginTop={3}>
        <Grid xs={12}>
          <Typography variant="h4">
            {servico.nome}
          </Typography>
        </Grid>
        <Grid xs={12}>
            <Divider/>
        </Grid>
        <Grid xs={12}>
          <Typography>Descrição: {servico.descricao}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>valor ($): { Number.parseFloat(servico.valor)}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>Tempo Estimado: {servico.tempoEstimado} minutos</Typography>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
