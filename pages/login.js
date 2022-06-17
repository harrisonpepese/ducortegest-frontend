import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {};
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
          <Button variant="contained">entrar</Button>
          <Button variant="contained" color="secondary">
            Registrar
          </Button>
        </>
      </Stack>
    </Box>
  );
}
