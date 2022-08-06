import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../Components/Layout/BaseLayout";
import CountPaper from "../Components/Paper/CountPaper";
import http from "../axios/axios";
import ButtonPaper from "../Components/Paper/ButtonPaper";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("");
  const gotoCreateUser = (id) => {
    router.push(`cliente/create`);
  };
  const gotoCreateAgendamento = (id) => {
    router.push(`atendimento/create`);
  };
  const gotoCreateServico = () => {
    router.push(`servico/create`);
  };
  useEffect(() => {
    http.get("relatorio/dashboard").then((res) => {
      setData(res.data);
    });
  }, [refresh]);
  setTimeout(() => {
    setRefresh("");
  }, 10000);
  return (
    <BaseLayout title={"Dashboard"}>
      <Grid xs={12} padding={2}>
        <ButtonPaper>
          <Button
            variant="contained"
            onClick={() => {
              gotoCreateUser();
            }}
          >
            Novo Cliente
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              gotoCreateAgendamento();
            }}
          >
            Novo Atendimento
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              gotoCreateServico();
            }}
          >
            Novo Serviço
          </Button>
        </ButtonPaper>
      </Grid>
      <Grid container>
        {data.map((x, i) => {
          return (
            <Grid item key={i} xs={12} sm={6} md={3} padding={2}>
              <CountPaper title={x.name} count={x.value}></CountPaper>
            </Grid>
          );
        })}
      </Grid>
    </BaseLayout>
  );
}
