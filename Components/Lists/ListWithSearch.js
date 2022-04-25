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
export default function ListWithSearch({ path, columns }) {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [column, setColumns] = useState(columns);
  const [search, setSearch] = useState("");
  const gotoCreate = (id) => {
    router.push(`${path}/create`);
  };
  useEffect(() => {
    console.log(search);
  }, [search]);
  useEffect(() => {
    setColumns(columns);
  }, [columns]);
  useEffect(async () => {
    const response = await http.get(`${path}`);
    console.log(response);
    setList(response.data);
  }, []);

  return (
    <Grid container xs={10} justifyContent="space-between">
      <Grid xs={8}>
        <TextField
          label="pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid>
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
          <DataGrid columns={column} rows={list} pageSize={5}></DataGrid>
        </div>
      </Grid>
    </Grid>
  );
}
