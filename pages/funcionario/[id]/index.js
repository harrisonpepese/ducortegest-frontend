import { Button, Grid, Typography, Paper } from "@mui/material";
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
  const [funcionario, setFuncionario] = useState({});
  const gotoEdit = () => {
    router.push(`${id}/edit`);
  };
  useEffect(() => {
    http
      .get(`funcionario/${id}`)
      .then((res) => setFuncionario(res.data))
      .catch((e) => toast.error(`não foi possivel`));
  }, []);
  return (
    <BaseLayout title="Funcionário">
      <Grid xs={8} md={12} padding={2}>
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
      <Grid xs={8} md={6} padding={2}>
        <ClienteInfoPaper {...funcionario} />
      </Grid>
      <Grid xs={8} md={6} padding={2}>
        <BasePaper></BasePaper>
      </Grid>
    </BaseLayout>
  );
}
