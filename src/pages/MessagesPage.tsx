import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "data",
    headerName: "Data",
    width: 100,
  },
  {
    field: "paciente",
    headerName: "Paciente",
    width: 250,
  },
  {
    field: "telefone",
    headerName: "Telefone",
    width: 150,
  },
  {
    field: "recado",
    headerName: "Recado",
    width: 500,
  },
];

const rows = [
  {
    id: 1,
    data: "09/12/2024",
    paciente: "João Silva",
    telefone: "(11) 98765-4321",
    recado: "Favor retornar ligação sobre resultados do exame.",
  },
  {
    id: 2,
    data: "09/12/2024",
    paciente: "Maria Souza",
    telefone: "(21) 91234-5678",
    recado: "Confirmar consulta para a próxima semana.",
  },
  {
    id: 3,
    data: "09/12/2024",
    paciente: "Carlos Pereira",
    telefone: "(31) 99876-5432",
    recado: "Remarcar consulta para outro dia.",
  },
  {
    id: 4,
    data: "09/12/2024",
    paciente: "Ana Costa",
    telefone: "(41) 98765-1234",
    recado: "Favor confirmar horário de atendimento.",
  },
  {
    id: 5,
    data: "09/12/2024",
    paciente: "Pedro Gomes",
    telefone: "(51) 91234-6789",
    recado: "Solicitar nova receita para medicamento.",
  },
  {
    id: 6,
    data: "09/11/2024",
    paciente: "Fernanda Oliveira",
    telefone: "(61) 98765-4321",
    recado: "Paciente precisa reagendar exame.",
  },
  {
    id: 7,
    data: "09/10/2024",
    paciente: "Paulo Mendes",
    telefone: "(71) 99876-5432",
    recado: "Favor enviar relatórios médicos por e-mail.",
  },
  {
    id: 8,
    data: "09/09/2024",
    paciente: "Juliana Ferreira",
    telefone: "(81) 91234-5678",
    recado: "Confirmar entrega de exames no consultório.",
  },
  {
    id: 9,
    data: "09/08/2024",
    paciente: "Marcos Lima",
    telefone: "(91) 98765-4321",
    recado: "Confirmar horário de cirurgia para próxima semana.",
  },
];

const MessagesPage = () => {
  return (
    <Box display="flex" justifyContent="space-between" gap="16px">
      <Paper sx={{ width: "70%" }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Recados</Typography>
        </Box>
        <Divider />
        <Box sx={{ height: 400, padding: "2%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Paper>
      <Paper sx={{ width: "30%" }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Adicionar recado</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "32px" }}>
          <Autocomplete
            disablePortal
            options={[
              { label: "João da Silva" },
              { label: "Augusto Pereira" },
              { label: "César Mello" },
            ]}
            sx={{ marginBottom: "16px" }}
            renderInput={(params) => (
              <TextField variant="standard" {...params} label="Paciente" />
            )}
          />
          <TextField
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Telefone"
          />
          <TextField
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Data"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Recado"
          />
          <Button sx={{ marginTop: "32px" }} fullWidth variant="contained">
            Adicionar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MessagesPage;
