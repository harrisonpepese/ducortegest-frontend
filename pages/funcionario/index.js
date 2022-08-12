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
    { field: "nomeCompleto", headerName: "Nome", flex: 1 },
    { field: "telefone", headerName: "Telefone", flex: 1 },
    { field: "comissao", headerName: "Comissão (%)", flex: 1 },
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
