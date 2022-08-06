import { Button, Grid, List, ListItem, Stack, Typography } from "@mui/material";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import { BasePaper } from "../../../Components/Paper/BasePaper";
import ButtonPaper from "../../../Components/Paper/ButtonPaper";
import http from "../../../axios/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import atendimentoStatusEnum from "../../../src/enums/atendimentoStatusEnum";
import DataFormater from "../../../src/helpers/dataFormat";

export default function AtendimentoDetail() {
  const router = useRouter();
  const [update, setUpdate] = useState(0);
  const { id } = router.query;
  const [atendimento, setAtendimento] = useState({});
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };
  const disableEdit = atendimento?.status == 3 || atendimento?.status == 2;
  const disableIniciarAtendimento = !atendimento?.status == 0;
  const disableFinalizaAtendimento =
    disableEdit || atendimento?.status == 0 || atendimento?.status == 2;
  const changeStatus = (status) => {
    const newAtendimento = {
      ...atendimento,
      status: status,
      servicos: atendimento.servicos.map((x) => x.id),
    };
    http.put(`atendimento/${id}`, newAtendimento).then((res) => {
      toast.success("atualizado com sucesso!");
      setUpdate(update + 1);
    });
  };
  useEffect(() => {
    http
      .get(`atendimento/${id}`)
      .then((res) => setAtendimento(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id, update]);
  return (
    <BaseLayout title={"Atendimento"}>
      <Grid xs={12} padding={2}>
        <ButtonPaper>
          <Button
            variant="contained"
            onClick={() => {
              gotoEdit();
            }}
            disabled={disableEdit}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            disabled={disableIniciarAtendimento}
            onClick={() => changeStatus(1)}
          >
            Iniciar atendimento
          </Button>
          <Button
            variant="contained"
            disabled={atendimento?.status == 2}
            onClick={() => changeStatus(3)}
          >
            Cancelar atendimento
          </Button>
          <Button
            variant="contained"
            disabled={disableFinalizaAtendimento}
            onClick={() => changeStatus(2)}
          >
            Finalizar atendimento
          </Button>
        </ButtonPaper>
      </Grid>
      <Grid xs={8} md={6} padding={2}>
        <BasePaper>
          <Stack>
            <Typography>Cliente: {atendimento.clienteName}</Typography>
            <Typography>Funcionario: {atendimento.funcionarioName}</Typography>
            <Typography>
              Status: {atendimentoStatusEnum[atendimento.status]}
            </Typography>
            <Typography>Serviços:</Typography>
            <List>
              {atendimento.servicos?.map((x, i) => (
                <ListItem key={i}>{x.nome}</ListItem>
              ))}
            </List>
          </Stack>
        </BasePaper>
      </Grid>
      <Grid xs={8} md={6} padding={2}>
        <BasePaper>
          <Stack>
            <Typography>Valor total</Typography>
            <Typography>
              {DataFormater.moneyFormat(
                atendimento.servicos?.reduce(
                  (acc, curr) => (acc += curr.valor),
                  0
                )
              )}
            </Typography>
            <Typography>Tempo estimado Total</Typography>
            <Typography>
              {DataFormater.timeRangeFormat(
                atendimento.servicos?.reduce(
                  (acc, curr) => (acc += curr.tempoEstimado),
                  0
                )
              )}
            </Typography>
          </Stack>
        </BasePaper>
      </Grid>
    </BaseLayout>
  );
}
