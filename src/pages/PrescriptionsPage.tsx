import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Prescription } from "../shared/types/prescription";
import { Delete, Print } from "@mui/icons-material";
import {
  createPrescription,
  deletePrescription,
  getPrescriptions,
} from "../shared/services/prescriptions.service";
import { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";
import PrescriptionPdf from "../components/PrescriptionPdf/PrescriptionPdf";
import { Patient } from "../shared/types/patient";
import { getPatients } from "../shared/services/patients.service";

const PrescriptionsPage = () => {
  const columns: GridColDef<Prescription[][number]>[] = [
    { field: "id", headerName: "Número", width: 75 },
    {
      field: "date",
      headerName: "Data",
      width: 100,
    },
    {
      field: "medication",
      headerName: "Remédio",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Quantidade",
      width: 150,
    },
    {
      field: "how_to_use",
      headerName: "Modo de uso",
      width: 150,
    },
    {
      field: "patient_fullname",
      headerName: "Paciente",
      width: 100,
      valueGetter: (_, row) => row?.patient?.full_name,
    },
    {
      field: "delete",
      headerName: "Excluir",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete color="error" />}
          label="Excluir"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
    {
      field: "print",
      headerName: "Imprimir",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Print color="primary" />}
          label="Imprimir"
          onClick={() => handlePrescriptionModal(params.row)}
        />,
      ],
    },
  ];

  const [prescriptions, setPrescriptions] = useState<Prescription[]>();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [prescription, setPrescription] = useState<Prescription>();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [openPrescriptionModal, setOpenPrescriptionModal] =
    useState<boolean>(false);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription>();
  const [patients, setPatients] = useState<Patient[]>();

  useEffect(() => {
    fetchPatients();
    fetchPrescriptions();

    const currentDate = new Date().toISOString().split("T")[0];
    setCurrentDate(currentDate);
    setPrescription({ date: currentDate } as Prescription);
  }, []);

  const filteredPrescriptions = prescriptions?.filter((prescription) =>
    prescription.patient_id
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const fetchPatients = () => {
    getPatients()
      .then((res) => setPatients(res))
      .catch((err) => console.error(err));
  };

  const handlePrescriptionModal = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setOpenPrescriptionModal(true);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setPrescription({
      ...prescription,
      [e.target.name]: e.target.value,
    } as Prescription);
  };

  const handleAutocompleteChange = (
    _: React.SyntheticEvent<Element, Event>,
    option: Patient | null
  ) => {
    if (option) {
      setPrescription({
        ...prescription,
        patient_id: option.id,
      } as Prescription);
    }
  };

  const fetchPrescriptions = () => {
    setListLoading(true);
    getPrescriptions()
      .then((res) => setPrescriptions(res))
      .catch((err) => setError(err))
      .finally(() => setListLoading(false));
  };

  const handleDelete = (id: number | string) => {
    setListLoading(true);
    deletePrescription(id)
      .catch((err) => setError(err))
      .finally(() => {
        setListLoading(false);
        fetchPrescriptions();
      });
  };

  const handleSubmit = () => {
    if (prescription && prescription.medication && prescription.patient_id) {
      setLoading(true);
      createPrescription(prescription)
        .then(() => setSuccess(true))
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
          fetchPrescriptions();
          setTimeout(() => {
            setError(false);
            setSuccess(false);
          }, 2000);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Paper sx={{ width: { lg: "70%", xs: "100%" } }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Receitas</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "2%" }}>
          <TextField
            variant="standard"
            label="Pesquisar"
            placeholder="Digite aqui o nome do paciente..."
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
            filteredPrescriptions &&
            filteredPrescriptions.length > 0 && (
              <DataGrid
                rows={filteredPrescriptions}
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
      <Paper sx={{ width: { lg: "30%", xs: "100%" } }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Adicionar receitas</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "32px" }}>
          <Autocomplete
            disablePortal
            options={patients || []}
            getOptionLabel={(option) => option.full_name}
            onChange={handleAutocompleteChange}
            sx={{ marginBottom: "16px" }}
            renderInput={(params) => (
              <TextField variant="standard" {...params} label="Paciente" />
            )}
          />
          <TextField
            onChange={handleInputChange}
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Remédio"
            name="medication"
          />
          <TextField
            onChange={handleInputChange}
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Data"
            type="date"
            name="date"
            slotProps={{ inputLabel: { shrink: true } }}
            value={prescription?.date || currentDate}
          />
          <TextField
            onChange={handleInputChange}
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Quantidade"
            name="amount"
          />
          <TextField
            onChange={handleInputChange}
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Modo de uso"
            name="how_to_use"
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
          >
            Adicionar
          </Button>
          {error && (
            <Box sx={{ paddingY: "32px" }}>
              <Alert severity="error">Erro ao cadastrar receita.</Alert>
            </Box>
          )}
          {success && (
            <Box sx={{ paddingY: "32px" }}>
              <Alert severity="success">Receita cadastrada com sucesso!</Alert>
            </Box>
          )}
        </Box>
      </Paper>
      <Modal
        open={openPrescriptionModal}
        content={
          selectedPrescription && <PrescriptionPdf {...selectedPrescription} />
        }
        title="Imprimir Receita"
        onClose={() => setOpenPrescriptionModal(false)}
        width="600px"
      />
    </Box>
  );
};

export default PrescriptionsPage;
