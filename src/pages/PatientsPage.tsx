import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Patient } from "../shared/types/patient";
import { useEffect, useState } from "react";
import { getPatients } from "../shared/services/patients.service";

const columns: GridColDef<Patient[][number]>[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "full_name",
    headerName: "Nome completo ",
    width: 250,
  },
  {
    field: "address",
    headerName: "Endereço",
    width: 250,
  },
  {
    field: "mobile_phone",
    headerName: "Celular",
    width: 150,
  },
  {
    field: "genre",
    headerName: "Gênero",
    width: 70,
  },
  {
    field: "observations",
    headerName: "Observações",
    width: 350,
  },
];

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    getPatients()
      .then((res) => setPatients(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = (params: GridRowParams<Patient>) => {
    const patientId = params.row.id;
    sessionStorage.setItem("patient", JSON.stringify(params.row));
    navigate(`/novo-paciente?id=${patientId}`);
  };

  const filteredPatients = patients?.filter((patient) =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => navigate("/novo-paciente")}
          size="small"
          variant="outlined"
        >
          Adicionar Paciente
        </Button>
      </Box>
      <Box sx={{ padding: "2%" }}>
        {loading && <CircularProgress />}
        {error && (
          <Alert severity="error">Erro ao buscar pacientes: {error}</Alert>
        )}
        {patients && patients.length > 0 && (
          <DataGrid
            rows={filteredPatients}
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
            onRowClick={handleRowClick}
            sx={{
              "& .MuiDataGrid-row": {
                cursor: "pointer",
              },
            }}
          />
        )}
        {patients && patients.length === 0 && (
          <Typography>Nenhum paciente cadastrado.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default PatientsPage;
