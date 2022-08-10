import { Button, Grid, Typography, Stack, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import { BasePaper } from "../../../Components/Paper/BasePaper";
import ButtonPaper from "../../../Components/Paper/ButtonPaper";
import ClienteInfoPaper from "../../../Components/Paper/ClienteInfoPaper";
import http from "../../../axios/axios";

export default function FuncionarioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [funcionario, setFuncionario] = useState({ data: {}, loading: true });
  const [funcionarioStatus, setFuncionarioStatus] = useState({
    data: {},
    loading: true,
  });
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };
  useEffect(() => {
    http
      .get(`funcionario/${id}`)
      .then((res) => setFuncionario({ data: res.data, loading: false }))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  useEffect(() => {
    http
      .get(`relatorio/funcionario/${id}`)
      .then((res) => setFuncionarioStatus({ data: res.data, loading: false }))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  return (
    <BaseLayout
      title="Funcionário"
      loading={funcionario.loading && funcionarioStatus.loading}
    >
      <Grid xs={12} padding={2}>
        <ButtonPaper>
          <Button
            onClick={() => {
              gotoEdit();
            }}
            variant="contained"
          >
            Editar funcionário
          </Button>
          <Button
            onClick={() => {
              gotoEdit();
            }}
            variant="contained"
          >
            Resetar senha
          </Button>
        </ButtonPaper>
      </Grid>
      <Grid xs={12} md={8} lg={6} padding={2}>
        <Paper>
          <ClienteInfoPaper {...funcionario.data} />
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
                <Typography>{funcionarioStatus.data.atendimentos}</Typography>
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
                <Typography>
                  {funcionarioStatus.data.ultimoAtendimento}
                </Typography>
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
                <Typography>{funcionarioStatus.data.totalServicos}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </Grid>
    </BaseLayout>
  );
}
