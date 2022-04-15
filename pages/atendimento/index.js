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
    { field: "cliente", headerName: "Cliente", width:200},
    { field: "funcionario", headerName: "Funcionário", width:200},
    { field: "serviços", headerName: "servicos", width:140},
    {
      field: "editar",
      headerName: "Ações",
      renderCell: (params) => <Button onClick={()=>gotoDetail(params.row._id)}>Detalhes</Button>,
    }
  ];
  return (
    <BaseLayout title="Atendimentos">
      <ListWithSearch path={'atendimento'} columns={columns}></ListWithSearch>
    </BaseLayout>
  );
}
