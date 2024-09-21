import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid"; // Import GridActionsCellItem
import { Medication } from "../shared/types/medication";
import { useEffect, useState } from "react";
import {
  createMedication,
  getMedications,
  deleteMedication,
} from "../shared/services/medications.service";
import { Delete } from "@mui/icons-material";

const MedicationsPage = () => {
  const columns: GridColDef<Medication[][number]>[] = [
    { field: "id", headerName: "Código", width: 100 },
    {
      field: "name",
      headerName: "Remédio",
      width: 250,
    },
    {
      field: "lab",
      headerName: "Laboratório",
      width: 250,
    },
    {
      field: "actions",
      headerName: "Excluir",
      type: "actions",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete color="error" />}
          label="Excluir"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  const [medications, setMedications] = useState<Medication[]>();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [medication, setMedication] = useState<Medication>();

  const filteredMedications = medications?.filter((medication) =>
    medication.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = () => {
    setListLoading(true);
    getMedications()
      .then((res) => setMedications(res))
      .catch((err) => setError(err))
      .finally(() => setListLoading(false));
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setMedication({
      ...medication,
      [e.target.name]: e.target.value,
    } as Medication);
  };

  const handleSubmit = () => {
    if (medication) {
      setLoading(true);
      createMedication(medication)
        .then(() => setSuccess(true))
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
          fetchMedications();
          setTimeout(() => {
            setError(false);
            setSuccess(false);
          }, 2000);
        });
    }
  };

  const handleDelete = (id: number | string) => {
    setListLoading(true);
    deleteMedication(id)
      .catch((err) => setError(err))
      .finally(() => {
        setListLoading(false);
        fetchMedications();
      });
  };

  return (
    <Box display="flex" justifyContent="space-between" gap="16px">
      <Paper sx={{ width: "70%" }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Remédios</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "2%" }}>
          <TextField
            variant="standard"
            label="Pesquisar"
            placeholder="Digite aqui o nome do remédio..."
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: "32px" }}
          />
          {listLoading && (
            <Box sx={{ padding: "4%" }}>
              <CircularProgress />
            </Box>
          )}
          {!listLoading &&
            filteredMedications &&
            filteredMedications.length > 0 && (
              <DataGrid
                rows={filteredMedications}
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
            )}
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
            name="name"
            onChange={handleInputChange}
          />
          <TextField
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Laboratório"
            name="lab"
            onChange={handleInputChange}
          />
          {loading && (
            <Box sx={{ padding: "4%" }}>
              <CircularProgress />
            </Box>
          )}
          <Button
            onClick={handleSubmit}
            sx={{ marginTop: "32px" }}
            fullWidth
            variant="contained"
            disabled={loading}
          >
            Adicionar
          </Button>
          {error && (
            <Box sx={{ paddingY: "32px" }}>
              <Alert severity="error">Erro ao cadastrar remédio.</Alert>
            </Box>
          )}
          {success && (
            <Box sx={{ paddingY: "32px" }}>
              <Alert severity="success">Remédio cadastrado com sucesso!</Alert>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MedicationsPage;
