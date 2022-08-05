import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import http from "../axios/axios";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const singIn = async () => {
    if (password != rePassword) {
      toast.error("As senhas não são correspondentes");
    }
    await http
      .post("auth/singUp", {
        username,
        password,
        email,
      })
      .catch((error) => {
        toast.error("Verifique o login e a senha para continuar.");
        console.log(error);
      })
      .then((res) => {
        toast.success("Usuário criado com sucesso.");
        router.push("/login");
      });

    //localStorage.setItem("token", token);
  };
  const redefinirSenha = async () => {};
  const cadastrar = async () => {};
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack spacing={2} alignContent="center">
        <Typography variant="h3">cadastrar</Typography>
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
        <TextField
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Confirmar senha"
        ></TextField>

        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></TextField>
        <>
          <Button variant="contained" onClick={() => singIn()}>
            Cadastar
          </Button>
          <Button variant="contained" color="secondary">
            Voltar
          </Button>
        </>
      </Stack>
    </Box>
  );
}
