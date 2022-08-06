import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dayjs } from "dayjs";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../axios/axios";
import ClienteInfoPaper from "../../../Components/Paper/ClienteInfoPaper";
import ButtonPaper from "../../../Components/Paper/ButtonPaper";

export default function ClienteDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState({});
  const [clienteStatus, setClienteStatus] = useState({});
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };
  const gotoAtendimento = () => {
    router.push(`/atendimento/create?clienteId=${id}`);
  };
  useEffect(() => {
    http
      .get(`cliente/${id}`)
      .then((res) => setCliente(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  useEffect(() => {
    http
      .get(`relatorio/cliente/${id}`)
      .then((res) => setClienteStatus(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  console.log(clienteStatus);
  return (
    <BaseLayout title="Cliente">
      <Grid xs={12} padding={2}>
        <ButtonPaper>
          <Button
            variant="contained"
            onClick={() => {
              gotoAtendimento();
            }}
          >
            Novo atendimento
          </Button>
          <Button
            onClick={() => {
              gotoEdit();
            }}
            variant="contained"
          >
            Editar cliente
          </Button>
        </ButtonPaper>
      </Grid>
      <Grid xs={12} md={6} padding={2}>
        <ClienteInfoPaper {...cliente} />
      </Grid>

      <Grid xs={12} md={6} padding={2}>
        <Paper sx={{ width: "100%", padding: 1, height: "100%" }} elevation={2}>
          <Stack spacing={1} justifyContent="center" alignItems="center">
            <Typography variant="h4">Informações</Typography>
            <Typography>
              Atendimentos Realizados: {clienteStatus.atendimentos}
            </Typography>
            <Typography>
              Ùltimo atendimento: {clienteStatus.ultimoAtendimento}
            </Typography>
            <Typography>
              Total de serviços: {clienteStatus.totalServicos}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </BaseLayout>
  );
}
