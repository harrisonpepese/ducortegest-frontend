import {
  Grid,
  List,
  TextField,
  Button,
  ListItem,
  ListItemText,
} from "@mui/material";
import { width } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../../src/axios";
export default function ListWithSearch({ path }) {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const gotoDetail = (id) => {
    router.push(`${path}/${id}`);
  };
  const gotoCreate = (id) => {
    router.push(`${path}/create`);
  };
  useEffect(() => {
    console.log(search);
  }, [search]);
  useEffect(async () => {
    const response = await http.get(`${path}`);
    console.log(response);
    setList(response.data);
  }, []);

  return (
    <Grid container xs={8} justifyContent="space-between">
      <Grid xs={8}>
        <TextField
          label="pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid xs={3}>
        <Button
          sx={{ height: 56 }}
          variant="contained"
          size="large"
          onClick={() => gotoCreate()}
        >
          novo
        </Button>
      </Grid>
      <Grid xs={12}>
        <div style={{ height: 400, width: "100%", marginTop: 20 }}>
          <DataGrid
            columns={[
              { field: "nome", headerName: "Nome", width:140},
              { field: "sobrenome", headerName: "Sobrenome", width:140},
              { field: "telefone", headerName: "telefone", width:140},
              {
                field: "editar",
                headerName: "Editar",
                renderCell: (params) => <Button onClick={()=>gotoDetail(params.row._id)}>Editar</Button>,
              },
              {
                headerName: "iniciar",
                renderCell: (params) => <Button>Atendimento</Button>,
                minWidth:200
              },
            ]}
            rows={list.map((x, index) => ({ ...x, id: index }))}
            pageSize={5}
          ></DataGrid>
        </div>
      </Grid>
    </Grid>
  );
}
