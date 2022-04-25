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

export default function ClienteDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [cliente, setCliente] = useState({});
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };
  useEffect(() => {
    http
      .get(`cliente/${id}`)
      .then((res) => setCliente(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, [id]);
  const renderGenderIcon = (gender) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "trans":
        return <TransgenderIcon />;
      default:
        return <></>;
    }
  };
  return (
    <BaseLayout title="Cliente">
      <Grid display="flex" xs={8} justifyContent="space-between">
        <Button variant="contained">Novo atendimento</Button>
        <Button variant="contained">Novo agendamento</Button>
        <Button
          onClick={() => {
            gotoEdit();
          }}
          variant="contained"
        >
          Editar cliente
        </Button>
      </Grid>
      <Grid xs={8} padding={2}>
        <Paper sx={{ width: "100%", padding: 1 }} elevation={2}>
          <Stack spacing={1} justifyContent="center" alignItems="center">
            <Avatar sx={{ width: 112, height: 112 }}>GB</Avatar>
            <Box display="flex">
              <Typography variant="h4">
                {cliente.nome} {cliente.sobrenome}
              </Typography>
              {renderGenderIcon(cliente.sexo)}
            </Box>
            <Box display="flex">
              <ContactPhoneIcon sx={{ marginRight: 1 }} />
              <Typography>{cliente.telefone}</Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </BaseLayout>
  );
}
