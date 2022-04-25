import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function ServicosPage() {
  const router = useRouter();
  const gotoDetail = (id) => {
    router.push(`servico/${id}`);
  };
  const columns = [
    { field: "nome", headerName: "Nome", width: 200 },
    { field: "valor", headerName: "Valor", width: 200 },
    { field: "tempoEstimado", headerName: "Tempo Estimado(min)", width: 140 },
    {
      field: "editar",
      headerName: "Ações",
      renderCell: (params) => (
        <Button onClick={() => gotoDetail(params.row.id)}>Detalhes</Button>
      ),
    },
  ];
  return (
    <BaseLayout title="Serviços">
      <ListWithSearch path="servico" columns={columns}></ListWithSearch>
    </BaseLayout>
  );
}
