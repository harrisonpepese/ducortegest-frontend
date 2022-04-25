import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";

export default function ClientesPage() {
  const router = useRouter();
  const gotoDetail = (id) => {
    router.push(`cliente/${id}`);
  };
  const columns = [
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "sobrenome", headerName: "Sobrenome", width: 200 },
    { field: "telefone", headerName: "Telefone", width: 140 },
    {
      field: "editar",
      headerName: "Ações",
      renderCell: (params) => (
        <Button onClick={() => gotoDetail(params.row.id)}>Detalhes</Button>
      ),
    },
  ];
  return (
    <BaseLayout title="Clientes">
      <ListWithSearch path="cliente" columns={columns}></ListWithSearch>
    </BaseLayout>
  );
}
