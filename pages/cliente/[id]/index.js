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
  const [cliente, setCliente] = useState({ data: {}, loading: true });
  const [clienteStatus, setClienteStatus] = useState({
    data: {},
    loading: true,
  });
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };
  const gotoAtendimento = () => {
    router.push(`/atendimento/create?clienteId=${id}`);
  };
  useEffect(() => {
    http
      .get(`cliente/${id}`)
      .then((res) => setCliente({ data: res.data, loading: false }))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  useEffect(() => {
    http
      .get(`relatorio/cliente/${id}`)
      .then((res) => setClienteStatus({ data: res.data, loading: false }))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  return (
    <BaseLayout
      title="Cliente"
      loading={cliente.loading && clienteStatus.loading}
    >
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
      <Grid xs={12} md={8} lg={6} padding={2}>
        <Paper>
          <ClienteInfoPaper {...cliente.data} />
          <Paper>
            <Grid container padding={2}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                margin={2}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Atendimentos Realizados:{" "}
                </Typography>
                <Typography>{clienteStatus.data.atendimentos}</Typography>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                margin={2}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Último atendimento:{" "}
                </Typography>
                <Typography>{clienteStatus.data.ultimoAtendimento}</Typography>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                margin={2}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Total de serviços:{" "}
                </Typography>
                <Typography>{clienteStatus.data.totalServicos}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Grid>
    </BaseLayout>
  );
}
