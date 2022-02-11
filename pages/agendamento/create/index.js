import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../src/axios";
import { minLength, required } from "../../../src/rules/InputRules";
import { toast } from "react-toastify";

export default function AgendamentoInput({ data = {} }) {
  const router = useRouter();
  const [input, setInput] = useState({
    cliente: { value: data.cliente || "", error: false, hint: "" },
    funcionario: { value: data.funcionario || "", error: false, hint: "" },
    horario: { value: data.horario || "", error: false, hint: "" },
    servicos: { value: data.servicos || [], error: false, hint: "" },
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
//   useEffect(() => {
//     const state = { ...input };
//     Object.keys(data).forEach((key) => {
//       if (key == "_id" || key == "__v") {
//         return;
//       }
//       state[key].value = data[key];
//     });
//     setInput(state);
//   }, [data]);

  useEffect(() => {
    http.get("servico/list").then((res) => setServicos(res.data));
  }, []);

  useEffect(() => {
    http.get("funcionario/list").then((res) => setFuncionarios(res.data));
  }, []);

  useEffect(() => {
    http.get("cliente/list").then((res) => setClientes(res.data));
  }, []);

  const submit = () => {
    if (validate()) {
      if (data._id) {
        return update();
      }
      return save();
    }
  };
  const update = async () => {
    await http
      .post(`servico/${data._id}`, {
        cliente: input.cliente.value,
        funcionario: input.funcionario.value,
        horario: input.horario.value,
        servicos: input.servicos.value,
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
      .post("servico", {
        cliente: input.cliente.value,
        funcionario: input.funcionario.value,
        horario: input.horario.value,
        servicos: input.servicos.value,
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
    <BaseLayout title={`${data._id ? "Editar" : "Criar"} serviço`}>
      <Grid container xs={9} justifyContent="space-between">
        <Grid xs={12} padding={2}>
          <TextField
            required
            fullWidth
            select
            error={input.cliente.error}
            helperText={input.cliente.hint}
            label="Cliente"
            value={input.cliente.value}
            onChange={(e) => {
              handler("cliente", [required], e.target.value);
            }}
          >
            {clientes.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.primary}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={12} padding={2}>
          <TextField
            required
            fullWidth
            select
            error={input.funcionario.error}
            helperText={input.funcionario.hint}
            label="Funcionário"
            value={input.funcionario.value}
            onChange={(e) => {
              handler("funcionario", [required], e.target.value);
            }}
          >
            {funcionarios.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.primary}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid xs={12} padding={2}>
          <TextField
            required
            fullWidth
            select
            error={input.horario.error}
            helperText={input.horario.hint}
            label="Horário"
            value={input.horario.value}
            onChange={(e) => {
              handler("horario", [required], e.target.value);
            }}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value="homen">homem</MenuItem>
            <MenuItem value="mulher">mulher</MenuItem>
            <MenuItem value="outros">outros</MenuItem>
          </TextField>
        </Grid>
        <Grid xs={12} padding={2}>
          <TextField
            required
            fullWidth
            select
            error={input.servicos.error}
            helperText={input.servicos.hint}
            label="Serviços"
            value={input.servicos.value}
            onChange={(e) => {
              handler("servicos", [required], e.target.value);
            }}
          >
            {servicos.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.primary}
              </MenuItem>
            ))}
          </TextField>
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
              save();
            }}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
