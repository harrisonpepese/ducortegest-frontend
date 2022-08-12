import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { minLength, required } from "../src/rules/InputRules";
import InputHandler from "../src/InputHandler/InputHandler";
import http from "../axios/axios";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
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

  const login = () => {
    if (!validate()) {
      toast.error("Verifique o login e a senha para continuar.");
      return;
    }
    http
      .post("auth/login", {
        username: input.username.value,
        password: input.password.value,
      })
      .then((res) => {
        const response = res.data;
        localStorage.setItem("token", response.access_token);
        http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.access_token}`;
        router.push("/");
      })
      .catch(() => {
        toast.error("Verifique o login e a senha para continuar.");
      });
  };
  const cadastrar = async () => {
    router.push("/singin");
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={2} alignContent="center">
        <Typography variant="h2">Du Corte Gest</Typography>
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
        <Link href="/forgotpassword">
          <Typography>Esqueceu sua senha?</Typography>
        </Link>
        <>
          <Button variant="contained" onClick={() => login()}>
            entrar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => cadastrar()}
          >
            Registrar
          </Button>
        </>
      </Stack>
    </Box>
  );
}
