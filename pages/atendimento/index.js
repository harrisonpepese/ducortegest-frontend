import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import atendimentoStatusEnum from "../../src/enums/atendimentoStatusEnum";
export default function AgendamentoPage() {
  const router = useRouter();
  const gotoDetail = (id) => {
    router.push(`atendimento/${id}`);
  };
  const columns = [
    { field: "clienteName", headerName: "Cliente", flex: 1 },
    { field: "funcionarioName", headerName: "Funcionário", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => atendimentoStatusEnum[params.row.status],
    },
    {
      field: "data",
      headerName: "Data",
      flex: 1,
      renderCell: (params) => params.row.data,
    },
    {
      field: "editar",
      headerName: "Ações",
      renderCell: (params) => (
        <Button onClick={() => gotoDetail(params.row.id)}>Detalhes</Button>
      ),
    },
  ];
  const initialState = {
    sorting: {
      sortModel: [{ field: "data", sort: "desc" }],
    },
  };
  return (
    <BaseLayout title="Atendimentos">
      <ListWithSearch
        path={"atendimento"}
        columns={columns}
        initialState={initialState}
      ></ListWithSearch>
    </BaseLayout>
  );
}
