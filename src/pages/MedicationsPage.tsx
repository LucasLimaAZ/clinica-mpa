import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "Código", width: 100 },
  {
    field: "remedio",
    headerName: "Remédio",
    width: 250,
  },
  {
    field: "laboratorio",
    headerName: "Laboratório",
    width: 250,
  },
];

const rows = [
  {
    id: 1,
    remedio: "Paracetamol",
    laboratorio: "Medley",
  },
  {
    id: 2,
    remedio: "Ibuprofeno",
    laboratorio: "Neo Química",
  },
  {
    id: 3,
    remedio: "Amoxicilina",
    laboratorio: "EMS",
  },
  {
    id: 4,
    remedio: "Dipirona",
    laboratorio: "Sanofi",
  },
  {
    id: 5,
    remedio: "Cetirizina",
    laboratorio: "GSK",
  },
  {
    id: 6,
    remedio: "Cloridrato de Metformina",
    laboratorio: "Merck",
  },
  {
    id: 7,
    remedio: "Aspirina",
    laboratorio: "Bayer",
  },
  {
    id: 8,
    remedio: "Omeprazol",
    laboratorio: "Aché",
  },
  {
    id: 9,
    remedio: "Losartana",
    laboratorio: "EMS",
  },
];

const MedicationsPage = () => {
  return (
    <Box display="flex" justifyContent="space-between" gap="16px">
      <Paper sx={{ width: "70%" }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Remédios</Typography>
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
          <Typography variant="h4">Adicionar remédios</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "32px" }}>
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
            label="Laboratório"
          />
          <Button sx={{ marginTop: "32px" }} fullWidth variant="contained">
            Adicionar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MedicationsPage;
