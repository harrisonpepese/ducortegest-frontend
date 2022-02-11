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
  const [search, setSearch] = useState("");
  const clienteList = [
    { id: "1", primary: "nome + sobrenome ", secodary: "telefone" },
    { id: "2", primary: "nome + sobrenome", secodary: "telefone" },
  ];
  useEffect(() => {
    console.log(search);
  }, [search]);

  const gotoDetail = (id) => {
    router.push(`cliente/${id}`);
  };
  return (
    <BaseLayout title="Clientes">
      <ListWithSearch path="cliente"></ListWithSearch>
    </BaseLayout>
  );
}
