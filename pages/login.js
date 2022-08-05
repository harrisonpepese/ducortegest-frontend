import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import http from "../axios/axios";

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    let response = await http
      .post("auth/login", {
        username,
        password,
      })
      .catch((error) => {
        toast.error("Verifique o login e a senha para continuar.");
        console.log(error);
      })
      .then((res) => res.data);
    localStorage.setItem("token", response.access_token);
    http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.access_token}`;
    router.push("/");
  };
  const redefinirSenha = async () => {};
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
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Usuário"
        ></TextField>
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        ></TextField>
        <Typography>Esqueceu sua senha?</Typography>
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
