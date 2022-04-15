import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../Components/Layout/BaseLayout";
import http from "../../../src/axios";
import { cpf, minLength, required } from "../../../src/rules/InputRules";
import { toast } from "react-toastify";
export default function ServicoInput({ data }) {
  const router = useRouter();
  const [input, setInput] = useState({
    nome: { value: data?.nome || "", error: false, hint: "" },
    descricao: { value: data?.descricao || "", error: false, hint: "" },
    valor: { value: data?.valor || "", error: false, hint: "" },
    tempoEstimado: { value: data?.tempoEstimado || "", error: false, hint: "" },
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
    const state = { ...input };
    Object.keys(data || {}).forEach((key) => {
      if (key == "_id" || key == "__v") {
        return;
      }
      state[key].value = data[key];
    });
    setInput(state);
  }, [data]);

  const submit = () => {
    if (validate()) {
      if (data?._id) {
        return update();
      }
      return save();
    }
  };
  const update = async () => {
    await http
      .post(`servico/${data?._id}`, {
        nome: input.nome.value,
        descricao: input.descricao.value,
        valor: input.valor.value,
        tempoEstimado: input.tempoEstimado.value,
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
        nome: input.nome.value,
        descricao: input.descricao.value,
        valor: input.valor.value,
        tempoEstimado: input.tempoEstimado.value,
      })
      .then(() => {
        toast.success("funcionario cadastrado com sucesso");
        back();
      })
      .catch((e) => {
        toast.error("Erro ao cadastrar funcionario.");
      });
  };
  const back = () => {
    router.back();
  };
  return (
    <BaseLayout title={`${data?._id ? "Editar" : "Criar"} serviço`}>
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
            error={input.descricao.error}
            helperText={input.descricao.hint}
            label="Descrição"
            value={input.descricao.value}
            onChange={(e) => {
              handler("descricao", [required, minLength], e.target.value);
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
              handler("valor", [required], e.target.value);
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
              handler("tempoEstimado", [required], e.target.value);
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
