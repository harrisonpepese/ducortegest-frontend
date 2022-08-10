import { Stack, Avatar, Box, Typography } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { BasePaper } from "./BasePaper";

export default function ClienteInfoPaper({ nomeCompleto, sexo, telefone }) {
  const renderGenderIcon = (gender) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "trans":
        return <TransgenderIcon />;
      default:
        return <></>;
    }
  };
  const getIniciais = (name) => {
    if (!name) {
      return "un";
    }
    const array = name.split(" ");
    return array[0].charAt(0) + array[1].charAt(0);
  };
  return (
    <BasePaper>
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        paddingTop={2}
      >
        <Avatar sx={{ width: 112, height: 112 }}>
          {getIniciais(nomeCompleto)}
        </Avatar>
        <Box display="flex" sx={{ paddingTop: 2 }}>
          <Typography variant="h4">{nomeCompleto}</Typography>
          {renderGenderIcon(sexo)}
        </Box>
        <Box display="flex">
          <ContactPhoneIcon sx={{ marginRight: 1 }} />
          <Typography>{telefone}</Typography>
        </Box>
      </Stack>
    </BasePaper>
  );
}
