import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../Components/Layout/BaseLayout";
import CountPaper from "../Components/Paper/CountPaper";
import http from "../axios/axios";
import ButtonPaper from "../Components/Paper/ButtonPaper";
import Loading from "../Components/Loading";
import dayjs from "dayjs";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState({ data: [], loading: true });
  const [dashboardDate, setDashboardDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
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
  const handleData = (e) => {
    setDashboardDate(e.target.value);
  };
  useEffect(() => {
    setData({ ...data, loading: true });
    http
      .get(`relatorio/dashboard?data=${dayjs(dashboardDate).toISOString()}`)
      .then((res) => {
        setData({ data: res.data, loading: false });
      });
  }, [refresh, dashboardDate]);
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
      <TextField
        type="date"
        value={dashboardDate}
        onChange={handleData}
      ></TextField>
      <Grid container>
        {data.loading ? (
          <Loading />
        ) : (
          data.data.map((x, i) => {
            return (
              <Grid item key={i} xs={12} sm={6} md={3} padding={2}>
                <CountPaper title={x.name} count={x.value}></CountPaper>
              </Grid>
            );
          })
        )}
      </Grid>
    </BaseLayout>
  );
}
