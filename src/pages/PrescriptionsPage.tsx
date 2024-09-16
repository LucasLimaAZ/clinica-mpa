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
  { field: "id", headerName: "Número", width: 100 },
  {
    field: "data",
    headerName: "Data",
    width: 100,
  },
  {
    field: "remedio",
    headerName: "Remédio",
    width: 250,
  },
  {
    field: "quantidade",
    headerName: "Quantidade",
    width: 150,
  },
  {
    field: "uso",
    headerName: "Modo de uso",
    width: 250,
  },
];

const rows = [
  {
    id: 1,
    data: "09/12/2024",
    remedio: "Paracetamol",
    quantidade: "2 caixas",
    uso: "1 comprimido a cada 8 horas",
  },
  {
    id: 2,
    data: "09/12/2024",
    remedio: "Ibuprofeno",
    quantidade: "2 caixas",
    uso: "1 comprimido a cada 6 horas",
  },
  {
    id: 3,
    data: "09/12/2024",
    remedio: "Amoxicilina",
    quantidade: "2 caixas",
    uso: "1 cápsula a cada 12 horas",
  },
  {
    id: 4,
    data: "09/12/2024",
    remedio: "Dipirona",
    quantidade: "2 caixas",
    uso: "1 comprimido a cada 6 horas",
  },
  {
    id: 5,
    data: "09/12/2024",
    remedio: "Cetirizina",
    quantidade: "2 caixas",
    uso: "1 comprimido por dia",
  },
  {
    id: 6,
    data: "09/11/2024",
    remedio: "Cloridrato de Metformina",
    quantidade: "2 caixas",
    uso: "1 comprimido a cada 12 horas",
  },
  {
    id: 7,
    data: "09/10/2024",
    remedio: "Aspirina",
    quantidade: "2 caixas",
    uso: "1 comprimido ao dia",
  },
  {
    id: 8,
    data: "09/09/2024",
    remedio: "Omeprazol",
    quantidade: "2 caixas",
    uso: "1 cápsula por dia",
  },
  {
    id: 9,
    data: "09/08/2024",
    remedio: "Losartana",
    quantidade: "2 caixas",
    uso: "1 comprimido ao dia",
  },
];

const PrescriptionsPage = () => {
  return (
    <Box display="flex" justifyContent="space-between" gap="16px">
      <Paper sx={{ width: "70%" }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Receitas</Typography>
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
          <Typography variant="h4">Adicionar receitas</Typography>
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
            label="Remédio"
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
            label="Quantidade"
          />
          <TextField
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Modo de uso"
          />
          <Button sx={{ marginTop: "32px" }} fullWidth variant="contained">
            Adicionar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrescriptionsPage;
