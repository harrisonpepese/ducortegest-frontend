import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../axios/axios";
import { cpf, minLength, required } from "../../../src/rules/InputRules";
import { toast } from "react-toastify";
import InputHandler from "../../../src/InputHandler/InputHandler";
export default function FuncionarioInput({ data, loading }) {
  const router = useRouter();
  const [input, setInput] = useState({
    nome: {
      value: data?.nome || "",
      error: false,
      hint: "",
      rules: [required, minLength],
      minLength: 3,
      required: true,
    },
    sobrenome: {
      value: data?.sobrenome || "",
      error: false,
      hint: "",
      rules: [required, minLength],
      minLength: 3,
      required: true,
    },
    sexo: {
      value: data?.sexo || "",
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
    },
    telefone: {
      value: data?.telefone || "",
      error: false,
      hint: "",
      rules: [required, minLength],
      minLength: 9,
      required: true,
    },
    cpf: {
      value: data?.cpf || "",
      error: false,
      hint: "",
      rules: [required, cpf, minLength],
      minLength: 11,
      required: false,
    },
  });

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
      toast.error("Existem campos inválidos");
      return false;
    }
    return true;
  };
  useEffect(() => {
    const state = { ...input };
    Object.keys(data || {}).forEach((key) => {
      if (key == "_id" || key == "__v") {
        return;
      }
      if (state[key]) {
        state[key].value = data[key];
      }
    });
    setInput(state);
  }, [data]);

  
  const submit = async () => {
    if (validate()) {
      if (data?.id) {
        return await update();
      }
      return await save();
    }
  };
  const save = async () => {
    await http
      .post("cliente", {
        nome: input.nome.value,
        sobrenome: input.sobrenome.value,
        sexo: input.sexo.value,
        telefone: input.telefone.value,
        cpf: input.cpf?.value,
      })
      .then(() => {
        toast.success("Cliente cadastrado com sucesso");
        back();
      })
      .catch((error) =>
        toast.error(`Não foi criar o cliente: ${error.response?.data?.message}`)
      );
  };
  const update = async () => {
    await http
      .put(`cliente/${data?.id}`, {
        nome: input.nome.value,
        sobrenome: input.sobrenome.value,
        sexo: input.sexo.value,
        telefone: input.telefone.value,
        cpf: input.cpf.value,
      })
      .then(() => {
        toast.success("Cliente atualizado com sucesso");
        back();
      })
      .catch((error) =>
        toast.error(
          `Não foi atualizar cliente o cliente: ${error.response?.data?.message}`
        )
      );
  };

  const back = () => {
    router.back();
  };
  return (
    <BaseLayout
      title={`${data?.id ? "Editar" : "Criar"} cliente`}
      loading={loading}
    >
      <Grid container xs={9} justifyContent="space-between">
        <Grid xs={12} padding={2}>
          <TextField
            required
            error={input.nome.error}
            helperText={input.nome.hint}
            label="Nome"
            value={input.nome.value}
            fullWidth
            onChange={(e) => {
              handler("nome", e.target.value);
            }}
          />
        </Grid>
        <Grid xs={12} padding={2}>
          <TextField
            required
            fullWidth
            error={input.sobrenome.error}
            helperText={input.sobrenome.hint}
            label="Sobrenome"
            value={input.sobrenome.value}
            onChange={(e) => {
              handler("sobrenome", e.target.value);
            }}
          />
        </Grid>
        <Grid xs={6} padding={2}>
          <TextField
            required
            fullWidth
            select
            error={input.sexo.error}
            helperText={input.sexo.hint}
            label="Sexo"
            value={input.sexo.value}
            onChange={(e) => {
              handler("sexo", e.target.value);
            }}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value="male">Masculino</MenuItem>
            <MenuItem value="female">Feminino</MenuItem>
            <MenuItem value="trans">Trans</MenuItem>
            <MenuItem value="nogender">Não binário</MenuItem>
          </TextField>
        </Grid>
        <Grid xs={6} padding={2}>
          <TextField
            fullWidth
            required
            error={input.telefone.error}
            helperText={input.telefone.hint}
            label="Telefone"
            value={input.telefone.value}
            inputProps={{ maxLength: 11 }}
            onChange={(e) => {
              handler("telefone", e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid xs={6} padding={2}>
          <TextField
            fullWidth
            label="CPF"
            error={input.cpf.error}
            helperText={input.cpf.hint}
            value={input.cpf.value}
            inputProps={{ maxLength: 11 }}
            onChange={(e) => {
              handler("cpf", e.target.value);
            }}
          ></TextField>
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
