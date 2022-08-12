import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { cpf, minLength, required, email } from "../src/rules/InputRules";
import InputHandler from "../src/InputHandler/InputHandler";
import http from "../axios/axios";
import axios from "axios";

export default function Login() {
  const [input, setInput] = useState({
    email: {
      value: "",
      error: false,
      hint: "",
      rules: [required, email],
      minLength: 3,
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
      return false;
    }
    return true;
  };
  const router = useRouter();
  const singIn = async () => {
    if (!validate()) {
      toast.error("Preencha todos os campos");
      return;
    }
    http
      .post("auth/forgotPassword", { email: input.email.value })
      .then((res) => {
        toast.success(
          "a solicitação foi enviada com sucesso, devido aos custos este mvp não enviara email para confirmação de senha use a senha 123456 para logar no seu usuário"
        );
        router.push("/login");
      })
      .catch((error) =>
        toast.error(
          `Não foi possivel recuperar a senha: ${error.response?.data?.message}`
        )
      );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack
        padding={2}
        spacing={2}
        alignContent="center"
        textAlign="center"
        width={400}
      >
        <Typography variant="h3">Recuperação de senha</Typography>
        <TextField
          type="email"
          value={input.email.value}
          error={input.email.error}
          helperText={input.email.hint}
          onChange={(e) => handler("email", e.target.value)}
          placeholder="email"
        ></TextField>
        <>
          <Button variant="contained" onClick={() => singIn()}>
            Enviar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              router.back();
            }}
          >
            Voltar
          </Button>
        </>
      </Stack>
    </Box>
  );
}
