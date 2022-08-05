import { Autocomplete, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../axios/axios";
import { minLength, required } from "../../../src/rules/InputRules";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function AgendamentoInput({ data }) {
  const router = useRouter();
  const { clienteId } = router.query;
  const [input, setInput] = useState({
    cliente: {
      value: null,
      error: false,
      hint: "",
    },
    funcionario: { value: null, error: false, hint: "" },
    data: { value: dayjs().format("YYYY-MM-DD"), error: false, hint: "" },
    hora: { value: dayjs().format("HH:mm"), error: false, hint: "" },
    servicos: { value: [], error: false, hint: "" },
  });
  const handler = (field, rules = [], value, length = 3) => {
    const validates = rules.map((func) => func(value, length));
    const error = validates.find((x) => x.error == true);
    let state;
    if (error) {
      state = {
        ...input,
        [field]: { value, error: true, hint: error.hint },
      };
    } else {
      state = { ...input, [field]: { value, error: false, hint: null } };
    }
    setInput(state);
  };

  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [servicos, setServicos] = useState([]);

  const validate = () => {
    const erros = Object.keys(input).map((key) => input[key].error);
    const hasError = erros.some((value) => value === true);
    if (hasError) {
      toast.error("Existem campos inválidos");
      return false;
    }
    return true;
  };
  useEffect(() => {
    const state = {
      cliente: {
        value: data?.clienteId
          ? { id: data.clienteId, label: data.clienteName }
          : null,
        error: false,
        hint: "",
      },
      funcionario: {
        value: data?.funcionarioId
          ? { id: data.funcionarioId, label: data.funcionarioName }
          : null,
        error: false,
        hint: "",
      },
      data: {
        value: dayjs(data?.data).format("YYYY-MM-DD"),
        error: false,
        hint: "",
      },
      hora: {
        value: dayjs(data?.data).format("HH:mm"),
        error: false,
        hint: "",
      },
      servicos: {
        value: data?.servicos
          ? data?.servicos.map((x) => ({ id: x.id, label: x.nome }))
          : [],
        error: false,
        hint: "",
      },
    };
    setInput(state);
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
          [required],
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
        clienteId: input.cliente.value?.id,
        funcionarioId: input.funcionario.value?.id,
        data: dayjs(input.data.value + "T" + input.hora.value).toISOString(),
        servicos: input.servicos.value.map((x) => x.id),
      })
      .then(() => {
        toast.success("Serviço cadastrado com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao cadastrar serviço.");
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
        toast.success("Agendamento cadastrado com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao Agendamento funcionario.");
      });
  };
  const back = () => {
    router.back();
  };
  return (
    <BaseLayout title={`${data?._id ? "Editar" : "Criar"} atendimento`}>
      <Grid container xs={9} justifyContent="space-between">
        <Grid xs={12} padding={2}>
          <Autocomplete
            required
            fullWidth
            id="atendimento-cliente"
            options={clientes}
            value={input.cliente.value}
            onChange={(e, value) => {
              handler("cliente", [required], value);
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
              handler("funcionario", [required], value);
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
              handler("data", [required], e.target.value);
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
              handler("hora", [required], e.target.value);
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
              handler("servicos", [required], value);
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
