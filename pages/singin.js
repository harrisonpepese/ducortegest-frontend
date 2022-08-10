import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { cpf, minLength, required } from "../src/rules/InputRules";
import http from "../axios/axios";

export default function Login() {
  const [input, setInput] = useState({
    username: {
      value: "",
      error: false,
      hint: "",
      rules: [required, minLength],
      minLength: 3,
      required: true,
    },
    password: {
      value: "",
      error: false,
      hint: "",
      rules: [required, minLength],
      minLength: 3,
      required: true,
    },
    rePassword: {
      value: "",
      error: false,
      hint: "",
      rules: [required, minLength],
      minLength: 3,
      required: true,
    },
    email: {
      value: "",
      error: false,
      hint: "",
      rules: [required, minLength],
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
    if (input.password.value != input.rePassword.value) {
      toast.error("As senhas não são correspondentes");
      return;
    }
    await http
      .post("auth/singUp", {
        username: input.username.value,
        password: input.password.value,
        email: input.email.value,
      })
      .catch((error) => {
        toast.error("Verifique o login e a senha para continuar.");
        console.log(error);
      })
      .then((res) => {
        toast.success("Usuário criado com sucesso.");
        router.push("/login");
      });
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
        <Typography variant="h3">Cadastrar</Typography>
        <TextField
          value={input.username.value}
          error={input.username.error}
          helperText={input.username.hint}
          onChange={(e) => handler("username", e.target.value)}
          placeholder="Usuário"
        ></TextField>
        <TextField
          type="password"
          value={input.password.value}
          error={input.password.error}
          helperText={input.password.hint}
          onChange={(e) => handler("password", e.target.value)}
          placeholder="Senha"
        ></TextField>
        <TextField
          type="password"
          value={input.rePassword.value}
          error={input.rePassword.error}
          helperText={input.rePassword.hint}
          onChange={(e) => handler("rePassword", e.target.value)}
          placeholder="Confirmar senha"
        ></TextField>

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
            Cadastar
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
