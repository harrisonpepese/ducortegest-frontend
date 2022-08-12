import { Autocomplete, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../axios/axios";
import { minLength, required } from "../../../src/rules/InputRules";
import InputHandler from "../../../src/InputHandler/InputHandler";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function AgendamentoInput({ data, loading }) {
  const router = useRouter();
  const { clienteId } = router.query;
  const [input, setInput] = useState({
    cliente: {
      value: null,
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
    },
    funcionario: {
      value: null,
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
    },
    data: {
      value: dayjs().format("YYYY-MM-DD"),
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
    },
    hora: {
      value: dayjs().format("HH:mm"),
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
    },
    servicos: {
      value: [],
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
    },
  });

  const handler = (field, value) => {
    console.log(input[field]);
    const state = InputHandler(input[field], value);
    const newInput = {
      ...input,
      [field]: state,
    };
    setInput(newInput);
  };

  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [servicos, setServicos] = useState([]);

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
      toast.error("Existem campos inválidos");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (data) {
      const state = { ...input };
      state.cliente.value = data?.clienteId
        ? { id: data.clienteId, label: data.clienteName }
        : null;
      state.funcionario.value = data?.funcionarioId
        ? { id: data.funcionarioId, label: data.funcionarioName }
        : null;
      state.data.value = dayjs(data?.data).format("YYYY-MM-DD");
      state.hora.value = dayjs(data?.data).format("HH:mm");
      state.servicos.value = data?.servicos
        ? data?.servicos.map((x) => ({ id: x.id, label: x.nome }))
        : [];
      setInput(state);
    }
  }, [data]);

  useEffect(() => {
    http.get("servico").then((res) => {
      setServicos(res.data.map((x) => ({ id: x.id, label: x.nome })));
    });
  }, []);

  useEffect(() => {
    http
      .get("funcionario")
      .then((res) =>
        setFuncionarios(
          res.data.map((x) => ({ id: x.id, label: x.nomeCompleto }))
        )
      );
  }, []);

  useEffect(() => {
    http.get("cliente").then((res) => {
      const data = res.data.map((x) => ({ id: x.id, label: x.nomeCompleto }));
      setClientes(data);
      if (clienteId) {
        handler(
          "cliente",
          data.find((x) => x.id == clienteId)
        );
      }
    });
  }, [clienteId]);

  const submit = () => {
    if (validate()) {
      if (data?.id) {
        return update();
      }
      return save();
    }
  };

  const update = async () => {
    console.log(input.data.value);
    await http
      .put(`atendimento/${data?.id}`, {
        cliente: input.cliente.value?.id,
        funcionario: input.funcionario.value?.id,
        data: dayjs(input.data.value + "T" + input.hora.value).toISOString(),
        servicos: input.servicos.value.map((x) => x.id),
      })
      .then(() => {
        toast.success("Atendimento atualizado com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao atualizado atendimento.");
      });
  };
  const save = async () => {
    await http
      .post("atendimento", {
        cliente: input.cliente.value?.id,
        funcionario: input.funcionario.value?.id,
        data: dayjs(input.data.value + "T" + input.hora.value).toISOString(),
        servicos: input.servicos.value.map((x) => x.id),
      })
      .then(() => {
        toast.success("Atendimento cadastrado com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao atendimento funcionario.");
      });
  };
  const back = () => {
    router.back();
  };
  return (
    <BaseLayout
      title={`${data?.id ? "Editar" : "Criar"} atendimento`}
      loading={loading}
    >
      <Grid container xs={9} justifyContent="space-between">
        <Grid xs={12} padding={2}>
          <Autocomplete
            required
            fullWidth
            id="atendimento-cliente"
            options={clientes}
            value={input.cliente.value}
            onChange={(e, value) => {
              handler("cliente", value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                error={input.cliente.error}
                helperText={input.cliente.hint}
                label="Cliente"
              ></TextField>
            )}
          ></Autocomplete>
        </Grid>
        <Grid xs={12} padding={2}>
          <Autocomplete
            fullWidth
            id="atendimento-funcionario"
            options={funcionarios}
            value={input.funcionario.value}
            onChange={(e, value) => {
              handler("funcionario", value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                error={input.funcionario.error}
                helperText={input.funcionario.hint}
                label="Funcionário"
              ></TextField>
            )}
          ></Autocomplete>
        </Grid>
        <Grid xs={12} padding={2}>
          <TextField
            required
            fullWidth
            type="date"
            error={input.data.error}
            helperText={input.data.hint}
            label="Data"
            value={input.data.value}
            onChange={(e) => {
              handler("data", e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid xs={12} padding={2}>
          <TextField
            required
            fullWidth
            type="time"
            error={input.hora.error}
            helperText={input.hora.hint}
            label="Horário"
            value={input.hora.value}
            onChange={(e) => {
              handler("hora", e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid xs={12} padding={2}>
          <Autocomplete
            fullWidth
            multiple
            id="atendimento-servico"
            options={servicos}
            value={input.servicos.value}
            onChange={(e, value) => {
              handler("servicos", value);
            }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                error={input.servicos.error}
                helperText={input.servicos.hint}
                label="Serviços"
              ></TextField>
            )}
          ></Autocomplete>
        </Grid>

        <Grid container padding={2} justifyContent="space-between">
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={() => {
              back();
            }}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              submit();
            }}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
