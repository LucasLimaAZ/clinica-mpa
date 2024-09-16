import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "nomeCompleto",
    headerName: "Nome completo ",
    width: 250,
    editable: true,
  },
  {
    field: "endereco",
    headerName: "Endereço",
    width: 250,
    editable: true,
  },
  {
    field: "idade",
    headerName: "Idade",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    nomeCompleto: "Snow da Silva",
    endereco: "Rua das quebradas, 123",
    idade: 14,
  },
  {
    id: 2,
    nomeCompleto: "Lannister Pereira Neves",
    endereco: "Algum lugar no mundo. Ap - 02",
    idade: 31,
  },
  {
    id: 3,
    nomeCompleto: "Lannister Albuquerque Matos",
    endereco: "Avenidas das industrias, 404",
    idade: 31,
  },
  {
    id: 4,
    nomeCompleto: "Stark da Silva Sauro",
    endereco: "Rua sem fim, 779",
    idade: 11,
  },
  {
    id: 5,
    nomeCompleto: "Targaryen Machado Teixeira",
    endereco: "Rua das quebradas, 123",
    idade: 27,
  },
  {
    id: 6,
    nomeCompleto: "Melisandre Nunes",
    endereco: "Algum lugar no mundo. Ap - 02",
    idade: 92,
  },
  {
    id: 7,
    nomeCompleto: "Clifford Soares Flores",
    endereco: "Avenidas das industrias, 404",
    idade: 44,
  },
  {
    id: 8,
    nomeCompleto: "Frances Medeiros Barros",
    endereco: "Rua sem fim, 779",
    idade: 36,
  },
  {
    id: 9,
    nomeCompleto: "Roxie Castro Cabral",
    endereco: "Rua dos bobos, 0",
    idade: 65,
  },
];

const PatientsPage = () => {
  const navigate = useNavigate();
  return (
    <Paper>
      <Box sx={{ padding: "2%" }}>
        <Typography variant="h4">Pacientes</Typography>
      </Box>
      <Divider />
      <Box
        sx={{ paddingX: "2%", paddingTop: "16px" }}
        display="flex"
        justifyContent="space-between"
      >
        <TextField
          variant="standard"
          label="Pesquisar"
          placeholder="Digite aqui o nome do paciente..."
          size="small"
          sx={{ width: "40%" }}
        />
        <Button
          onClick={() => navigate("/novo-paciente")}
          size="small"
          variant="outlined"
        >
          Adicionar Paciente
        </Button>
      </Box>
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
  );
};

export default PatientsPage;
