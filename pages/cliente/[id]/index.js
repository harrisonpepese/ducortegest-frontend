import {
  Avatar,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../src/axios";
import ClienteInfoPaper from "../../../Components/Paper/ClienteInfoPaper";
import ButtonPaper from "../../../Components/Paper/ButtonPaper";

export default function ClienteDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState({});
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
  return (
    <BaseLayout title="Cliente">
      <Grid xs={8} md={12} padding={2}>
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
      <Grid xs={8} md={6} padding={2}>
        <ClienteInfoPaper {...cliente} />
      </Grid>

      <Grid xs={8} md={6} padding={2}>
        <Paper sx={{ width: "100%", padding: 1, height: "100%" }} elevation={2}>
          <Stack spacing={1} justifyContent="center" alignItems="center">
            <Typography variant="h4">Informações</Typography>
            <Typography>Atendimentos Realizados:</Typography>
            <Typography>Ùltimo atendimento:</Typography>
            <Typography>proximo atendimento</Typography>
          </Stack>
        </Paper>
      </Grid>
    </BaseLayout>
  );
}
