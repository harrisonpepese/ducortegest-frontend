import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../axios/axios";
import { cpf, minLength, required } from "../../../src/rules/InputRules";
import InputHandler from "../../../src/InputHandler/InputHandler";
import { toast } from "react-toastify";
export default function ServicoInput({ data, loading }) {
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
    descricao: {
      value: data?.descricao || "",
      error: false,
      hint: "",
      rules: [required, minLength],
      minLength: 3,
      required: true,
    },
    valor: {
      value: data?.valor || "",
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
    },
    tempoEstimado: {
      value: data?.tempoEstimado || "",
      error: false,
      hint: "",
      rules: [required],
      minLength: null,
      required: true,
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

  const submit = () => {
    if (validate()) {
      if (data?.id) {
        return update();
      }
      return save();
    }
  };
  const update = async () => {
    await http
      .put(`servico/${data?.id}`, {
        nome: input.nome.value,
        descricao: input.descricao.value,
        valor: input.valor.value,
        tempoEstimado: input.tempoEstimado.value,
      })
      .then(() => {
        toast.success("Serviço atualizar com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao atualizar serviço.");
      });
  };
  const save = async () => {
    await http
      .post("servico", {
        nome: input.nome.value,
        descricao: input.descricao.value,
        valor: input.valor.value,
        tempoEstimado: input.tempoEstimado.value,
      })
      .then(() => {
        toast.success("Serviço cadastrado com sucesso");
        back();
      })
      .catch((error) =>
        toast.error(
          `Não foi criar o serviço: ${error.response?.data?.message}`
        )
      );
  };
  const back = () => {
    router.back();
  };
  return (
    <BaseLayout
      title={`${data?.id ? "Editar" : "Criar"} serviço`}
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
            error={input.descricao.error}
            helperText={input.descricao.hint}
            label="Descrição"
            value={input.descricao.value}
            onChange={(e) => {
              handler("descricao", e.target.value);
            }}
          />
        </Grid>
        <Grid xs={6} padding={2}>
          <TextField
            required
            fullWidth
            type="number"
            error={input.valor.error}
            helperText={input.valor.hint}
            label="valor"
            value={input.valor.value}
            onChange={(e) => {
              handler("valor", e.target.value);
            }}
          ></TextField>
        </Grid>
        <Grid xs={6} padding={2}>
          <TextField
            fullWidth
            required
            type="number"
            error={input.tempoEstimado.error}
            helperText={input.tempoEstimado.hint}
            label="Tempo Estimado (min)"
            value={input.tempoEstimado.value}
            onChange={(e) => {
              handler("tempoEstimado", e.target.value);
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
