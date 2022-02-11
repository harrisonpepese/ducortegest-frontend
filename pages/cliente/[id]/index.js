import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../src/axios";

export default function ClienteDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState({});
  const gotoEdit = ()=>{
      router.push(`${id}/edit`)
  }
  useEffect(() => {
    http
      .get(`cliente/${id}`)
      .then((res) => setCliente(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, []);
  return (
    <BaseLayout title="Cliente">
      <Grid container xs={8} justifyContent="space-between">
        <Button variant="contained">Novo atendimento</Button>
        <Button variant="contained">Novo agendamento</Button>
        <Button onClick={()=>{gotoEdit()}} variant="contained">Editar cliente</Button>
      </Grid>
      <Grid container xs={8} marginTop={3}>
        <Grid xs={12}>
          <Typography variant="h4">
            {cliente.nome} {cliente.sobrenome}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>Sexo: {cliente.sexo}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>Telefone: {cliente.telefone}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>CPF: {cliente.cpf}</Typography>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
