import { Button, Divider, Grid, Typography, Stack } from "@mui/material";
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
  const [servico, setServico] = useState({});
  const [servicoStatus, setServicoStatus] = useState({});
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };

  useEffect(() => {
    http
      .get(`servico/${id}`)
      .then((res) => setServico(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);

  useEffect(() => {
    http
      .get(`relatorio/funcionario/${id}`)
      .then((res) => setServicoStatus(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  return (
    <BaseLayout title="Serviço">
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
      <Grid xs={12} md={8} padding={2}>
        <BasePaper>
          <Grid xs={12}>
            <Typography variant="h4">{servico.nome}</Typography>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
          <Grid xs={12}>
            <Typography>Descrição: {servico.descricao}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>
              valor ($): {Number.parseFloat(servico.valor)}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>
              Tempo Estimado: {servico.tempoEstimado} minutos
            </Typography>
          </Grid>
        </BasePaper>
      </Grid>
      <Grid xs={12} md={6} padding={2}>
        <BasePaper>
          <Stack spacing={1} justifyContent="center" alignItems="center">
            <Typography variant="h4">Informações</Typography>
            <Typography>
              Efetuados hoje: {servicoStatus.atendimentos}
            </Typography>
            <Typography>
              Ùltimo efetuado: {servicoStatus.ultimoAtendimento}
            </Typography>
            <Typography>
              valor total hoje:{" "}
              {(servicoStatus.totalServicos || 0) * (servico.valor || 0)}
            </Typography>
          </Stack>
        </BasePaper>
      </Grid>
    </BaseLayout>
  );
}
