import { Button, Grid, Typography, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import { BasePaper } from "../../../Components/Paper/BasePaper";
import ButtonPaper from "../../../Components/Paper/ButtonPaper";
import http from "../../../axios/axios";

export default function FuncionarioDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [servico, setServico] = useState({ data: {}, loading: true });
  const [servicoStatus, setServicoStatus] = useState({
    data: {},
    loading: true,
  });
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };

  useEffect(() => {
    http
      .get(`servico/${id}`)
      .then((res) => setServico({ data: res.data, loading: false }))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);

  useEffect(() => {
    http
      .get(`relatorio/funcionario/${id}`)
      .then((res) => setServicoStatus({ data: res.data, loading: false }))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  return (
    <BaseLayout
      title="Serviço"
      loading={servico.loading && servicoStatus.loading}
    >
      <Grid xs={12} padding={2}>
        <ButtonPaper>
          <Button
            onClick={() => {
              gotoEdit();
            }}
            variant="contained"
          >
            Editar serviço
          </Button>
        </ButtonPaper>
      </Grid>
      <Grid xs={12} md={8} lg={6} padding={2}>
        <Paper>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            margin={2}
          >
            <Typography variant="h4" paddingTop={2}>
              {servico.data.nome}
            </Typography>
          </Grid>
          <Grid container padding={2}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
            >
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>Descrição: </Typography>
                <Typography>{servico.data.descricao}</Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
            >
              <Grid container>
                <Typography sx={{ fontWeight: "bold" }}>
                  Tempo Estimado:{" "}
                </Typography>
                <Typography>&nbsp;{servico.data.tempoEstimado}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
              paddingTop={2}
            >
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>
                  Efetuados hoje:{" "}
                </Typography>
                <Typography>&nbsp;{servicoStatus.data.atendimentos}</Typography>
              </Grid>
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>
                  Último efetuado:{" "}
                </Typography>
                <Typography>
                  &nbsp;{servicoStatus.data.ultimoAtendimento}
                </Typography>
              </Grid>
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>
                  Valor total hoje:{" "}
                </Typography>
                <Typography>
                  &nbsp;
                  {(servicoStatus.data.totalServicos || 0) *
                    (servico.valor || 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </BaseLayout>
  );
}
