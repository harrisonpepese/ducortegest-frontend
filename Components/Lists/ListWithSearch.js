import {
  Grid,
  List,
  TextField,
  Button,
  ListItem,
  ListItemText,
} from "@mui/material";
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
    const response = await http.get(`${path}/list`);
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
        <List>
          {list.map((item) => (
            <ListItem button key={item.id} onClick={() => gotoDetail(item.id)}>
              <ListItemText primary={item.primary} secondary={item.secodary} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
