import { Button } from "@mui/material";
import { useRouter } from "next/router";
import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";

export default function ClientesPage() {
  const router = useRouter();
  const gotoDetail = (id) => {
    router.push(`cliente/${id}`);
  };
  const columns = [
    { field: "nomeCompleto", headerName: "Nome", flex: 1 },
    { field: "telefone", headerName: "Telefone", flex: 1 },
    { field: "cpf", headerName: "cpf", flex: 1 },
    {
      field: "editar",
      headerName: "Ações",
      renderCell: (params) => (
        <Button onClick={() => gotoDetail(params.row.id)}>Detalhes</Button>
      ),
    },
  ];
  return (
    <BaseLayout key="clienteTable" title="Clientes">
      <ListWithSearch path="cliente" columns={columns}></ListWithSearch>
    </BaseLayout>
  );
}
