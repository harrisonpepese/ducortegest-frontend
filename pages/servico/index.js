import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

export default function ServicosPage(){
    const gotoDetail = (id) => {
        router.push(`servico/${id}`);
      };
      const columns = [
        { field: "nome", headerName: "Nome", width:200},
        { field: "sobrenome", headerName: "Sobrenome", width:200},
        { field: "telefone", headerName: "Telefone", width:140},
        {
          field: "editar",
          headerName: "Ações",
          renderCell: (params) => <Button onClick={()=>gotoDetail(params.row._id)}>Detalhes</Button>,
        }
      ];
    return (
        <BaseLayout title='Serviços'>
            <ListWithSearch path="servico" columns={columns}></ListWithSearch>
        </BaseLayout>
    )
}