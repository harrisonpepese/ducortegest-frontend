import { Grid, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { minLength } from "../../src/rules/InputRules";
import InputHandler from "../../src/InputHandler/InputHandler";
import http from "../../axios/axios";
import Loading from "../Loading";
import dayjs from "dayjs";
export default function ListWithSearch({ path, columns, initialState }) {
  const router = useRouter();
  const [list, setList] = useState({ data: [], loading: true });
  console.log(list.data);
  const [column, setColumns] = useState(columns);
  const [input, setInput] = useState({
    search: {
      value: "",
      error: false,
      hint: "",
      rules: [minLength],
      minLength: 3,
      required: true,
    },
  });
  const gotoCreate = (id) => {
    router.push(`${path}/create`);
  };

  const handler = (field, value) => {
    const state = InputHandler(input[field], value);
    const newInput = {
      ...input,
      [field]: state,
    };
    setInput(newInput);
  };

  const validate = () => {
    const keys = Object.keys(input);
    const erros = keys.map((key) => {
      if (input[key].error) {
        return true;
      } else if (input[key].required) {
        return input[key].value == "";
      }
      return false;
    });
    const hasError = erros.some((value) => value === true);
    if (hasError) {
      return false;
    }
    return true;
  };
  const get = () => {
    http
      .get(`${path}`)
      .then((res) => {
        console.log(res);
        if (res && Array.isArray(res.data)) {
          setList({ data: res.data.map((x) => parseData(x)), loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const parseData = (entity) => {
    entity.data = dayjs(entity.data).format("YYYY/MM/DD HH:mm");
    return entity;
  };
  const getWithGuery = (filter) => {
    http
      .get(`${path}/query?filter=${filter}`)
      .then((res) => {
        if (res && Array.isArray(res.data)) {
          setList({ data: res.data.map((x) => parseData(x)), loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (validate()) {
      getWithGuery(input.search.value);
    } else {
      get();
    }
  }, [input.search]);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <Grid xs={12} md={8} padding={2}>
        <TextField
          key="search"
          label="pesquisar"
          value={input.search.value}
          onChange={(e) => handler("search", e.target.value)}
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
          {list.loading ? (
            <Loading />
          ) : (
            <DataGrid
              columns={column}
              initialState={initialState}
              rows={list.data}
              pageSize={5}
            ></DataGrid>
          )}
        </div>
      </Grid>
    </>
  );
}
