import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const NewPatientPage = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "50%" }}>
        <Typography sx={{ padding: "4%" }} variant="h4">
          Cadastrar novo paciente
        </Typography>
        <Divider />
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "32px",
              paddingX: "4%",
              paddingY: "2%",
            }}
          >
            <TextField variant="standard" fullWidth label="Nome completo" />
            <TextField variant="standard" fullWidth label="Responsável" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "32px",
              paddingX: "4%",
              paddingY: "2%",
            }}
          >
            <TextField variant="standard" fullWidth label="Telefone" />
            <TextField variant="standard" fullWidth label="Celular" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "32px",
              paddingX: "4%",
              paddingY: "2%",
            }}
          >
            <TextField variant="standard" fullWidth label="Gênero" />
            <TextField variant="standard" fullWidth label="Idade" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "32px",
              paddingX: "4%",
              paddingY: "2%",
            }}
          >
            <TextField variant="standard" fullWidth label="Endereço" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "32px",
              paddingX: "4%",
              paddingY: "2%",
            }}
          >
            <TextField variant="standard" fullWidth label="Indicação" />
          </Box>
          <Box sx={{ padding: "4%" }}>
            <Button variant="contained">Cadastrar</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewPatientPage;
