import { Iron } from "@mui/icons-material";
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
import http from "../../axios/axios";
import Loading from "../Loading";
export default function ListWithSearch({ path, columns }) {
  const router = useRouter();
  const [list, setList] = useState({ data: [], loading: true });
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

  useEffect(() => {
    http
      .get(`${path}`)
      .then((res) => {
        console.log(res);
        if (res && Array.isArray(res.data)) {
          setList({ data: res.data, loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Table = () => {
    return (
      <>
        <Grid xs={12} md={8} padding={2}>
          <TextField
            label="pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid xs={12} md={4} padding={2}>
          <Button
            fullWidth
            sx={{ height: 56 }}
            variant="contained"
            size="large"
            onClick={() => gotoCreate()}
          >
            novo
          </Button>
        </Grid>
        <Grid xs={12} padding={2}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid columns={column} rows={list.data} pageSize={5}></DataGrid>
          </div>
        </Grid>
      </>
    );
  };

  return <>{list.loading ? <Loading /> : <Table />}</>;
}
