import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
export default function AgendamentoPage() {
  const router = useRouter();
  const gotoDetail = (id) => {
    router.push(`atendimento/${id}`);
  };
  const columns = [
    { field: "clienteName", headerName: "Cliente", flex: 1 },
    { field: "funcionarioName", headerName: "Funcionário", flex: 1 },
    { field: "qtnServicos", headerName: "qtd servicos", flex: 1 },
    {
      field: "editar",
      headerName: "Ações",
      renderCell: (params) => (
        <Button onClick={() => gotoDetail(params.row.id)}>Detalhes</Button>
      ),
    },
  ];
  return (
    <BaseLayout title="Atendimentos">
      <ListWithSearch path={"atendimento"} columns={columns}></ListWithSearch>
    </BaseLayout>
  );
}
