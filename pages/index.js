import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../Components/Layout/BaseLayout";
import CountPaper from "../Components/Paper/CountPaper";
import http from "../axios/axios";

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
      <Grid xs={8} container justifyContent="space-between">
        <Grid>
          <Button
            variant="contained"
            onClick={() => {
              gotoCreateUser();
            }}
          >
            Novo Cliente
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() => {
              gotoCreateAgendamento();
            }}
          >
            Novo Atendimento
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={() => {
              gotoCreateServico();
            }}
          >
            Novo Serviço
          </Button>
        </Grid>
      </Grid>
      <Grid container xs={10} spacing={4} margin={2}>
        {data.map((x, i) => {
          return (
            <Grid item key={i}>
              <CountPaper title={x.name} count={x.value}></CountPaper>
            </Grid>
          );
        })}
      </Grid>
    </BaseLayout>
  );
}
