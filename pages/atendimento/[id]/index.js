import { Button, Grid, Chip, Stack, Typography } from "@mui/material";
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
  const [atendimento, setAtendimento] = useState({ data: {}, loading: true });
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
      .then((res) => setAtendimento({ data: res.data, loading: false }))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id, update]);
  return (
    <BaseLayout title={"Atendimento"} loading={atendimento.loading}>
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
            disabled={atendimento.data?.status == 2}
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
      <Grid xs={12} md={8} padding={2}>
        <BasePaper>
          <Grid container padding={2}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
            >
              <Typography sx={{ fontWeight: "bold" }}>Cliente: </Typography>
              <Typography>{atendimento.data.clienteName}</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
            >
              <Typography sx={{ fontWeight: "bold" }}>Funcionario: </Typography>
              <Typography>{atendimento.data.funcionarioName}</Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
            >
              <Typography sx={{ fontWeight: "bold" }}>Status: </Typography>
              <Typography>
                {atendimentoStatusEnum[atendimento.data.status]}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
            >
              <Typography sx={{ fontWeight: "bold" }}>Serviços: </Typography>
              <Stack direction="row" spacing={1}>
                {atendimento.data.servicos?.map((x, i) => (
                  <Chip key={i} label={x.nome} />
                ))}
              </Stack>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              margin={2}
            >
              <Typography sx={{ fontWeight: "bold" }}>Valor total: </Typography>
              <Typography>
                {DataFormater.moneyFormat(
                  atendimento.data.servicos?.reduce(
                    (acc, curr) => (acc += curr.valor),
                    0
                  )
                )}
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
                Tempo estimado Total:{" "}
              </Typography>
              <Typography>
                {DataFormater.timeRangeFormat(
                  atendimento.data.servicos?.reduce(
                    (acc, curr) => (acc += curr.tempoEstimado),
                    0
                  )
                )}
              </Typography>
            </Grid>
          </Grid>
        </BasePaper>
      </Grid>
    </BaseLayout>
  );
}
