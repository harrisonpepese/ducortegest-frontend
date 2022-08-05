import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../axios/axios";
import { cpf, minLength, required } from "../../../src/rules/InputRules";
import { toast } from "react-toastify";
export default function FuncionarioInput({ data }) {
  const router = useRouter();
  const [input, setInput] = useState({
    nome: { value: data?.nome || "", error: false, hint: "" },
    sobrenome: { value: data?.sobrenome || "", error: false, hint: "" },
    sexo: { value: data?.sexo || "", error: false, hint: "" },
    telefone: { value: data?.telefone || "", error: false, hint: "" },
    cpf: { value: data?.cpf || "", error: false, hint: "" },
    cnpj: { value: data?.cnpj || "", error: false, hint: "" },
    comissao: { value: data?.comissao || "", error: false, hint: "" },
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

  const validate = () => {
    const erros = Object.keys(input).map((key) => input[key].error);
    const hasError = erros.some((value) => value === true);
    if (hasError) {
      toast.error("Existem campos inválidos");
      return false;
    }
    return true;
  };
  const submit = async () => {
    if (validate()) {
      if (data?._id) {
        return await update();
      }
      return await save();
    }
  };
  const save = async () => {
    await http
      .post(`funcionario${data?._id ? `/${data._id}` : ""}`, {
        nome: input.nome.value,
        sobrenome: input.sobrenome.value,
        sexo: input.sexo.value,
        telefone: input.telefone.value,
        cpf: input.cpf.value,
        cnpj: input.cnpj.value,
        comissao: input.comissao.value,
      })
      .then(() => {
        toast.success("funcionario cadastrado com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao cadastrar funcionario.");
      });
  };
  const update = async () => {
    await http
      .put(`funcionario/${data?._id}`, {
        nome: input.nome.value,
        sobrenome: input.sobrenome.value,
        sexo: input.sexo.value,
        telefone: input.telefone.value,
        cpf: input.cpf.value,
        cnpj: input.cnpj.value,
        comissao: input.comissao.value,
      })
      .then(() => {
        toast.success("funcionario atualizado com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao atualizar funcionario.");
      });
  };

  const back = () => {
    router.back();
  };
  return (
    <BaseLayout title={`${data?._id ? "Editar" : "Criar"} funcionario`}>
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
              handler("nome", [required, minLength], e.target.value);
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
              handler("sobrenome", [required, minLength], e.target.value);
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
              handler("sexo", [required], e.target.value);
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
              handler("telefone", [required, minLength], e.target.value, 9);
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
              handler("cpf", [required, cpf, minLength], e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid xs={6} padding={2}>
          <TextField
            fullWidth
            label="CNPJ"
            error={input.cnpj.error}
            helperText={input.cnpj.hint}
            value={input.cnpj.value}
            inputProps={{ maxLength: 14 }}
            onChange={(e) => {
              handler("cnpj", [], e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid xs={12} padding={2}>
          <TextField
            fullWidth
            type="number"
            label="Comissao"
            error={input.comissao.error}
            helperText={input.comissao.hint}
            value={input.comissao.value}
            inputProps={{ maxLength: 2 }}
            onChange={(e) => {
              handler("comissao", [required, minLength], e.target.value, 2);
            }}
          ></TextField>
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
