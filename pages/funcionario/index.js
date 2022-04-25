import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function FuncionarioPage() {
  const router = useRouter();
  const gotoDetail = (id) => {
    router.push(`funcionario/${id}`);
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
    <BaseLayout title="Funcionários">
      <ListWithSearch path={"funcionario"} columns={columns}></ListWithSearch>
    </BaseLayout>
  );
}
