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
import { ExamRequest } from "../shared/types/exam-request";
import { useEffect, useState } from "react";
import {
  createExamRequest,
  deleteExamRequest,
  getExamRequests,
} from "../shared/services/exam-requests.service";
import { Delete, Print } from "@mui/icons-material";
import { Patient } from "../shared/types/patient";
import { getPatients } from "../shared/services/patients.service";
import Modal from "../components/Modal/Modal";
import ExamRequestPdf from "../components/ExamRequestPdf/ExamRequestPdf";
import { formatDate } from "../shared/helper";

const ExamRequestsPage = () => {
  const columns: GridColDef<ExamRequest[][number]>[] = [
    {
      field: "id",
      headerName: "Número",
      width: 80,
    },
    {
      field: "date",
      headerName: "Data",
      width: 100,
      valueGetter: (_, row) => formatDate(row?.date),
    },
    {
      field: "patient_full_name",
      headerName: "Nome",
      width: 200,
      valueGetter: (_, row) => row?.patient?.full_name,
    },
    {
      field: "file_location",
      headerName: "Localização da ficha",
      width: 170,
      valueGetter: (_, row) => row?.patient?.file_location,
    },
    {
      field: "exams",
      headerName: "Exames",
      width: 250,
    },
    {
      field: "actions",
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
          onClick={() => handleExamRequestModal(params.row)}
        />,
      ],
    },
  ];

  const [examRequests, setExamRequests] = useState<ExamRequest[]>();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [examRequest, setExamRequest] = useState<ExamRequest>();
  const [patients, setPatients] = useState<Patient[]>();
  const [currentDate, setCurrentDate] = useState<string>("");
  const [openExamRequestModal, setOpenExamRequestModal] =
    useState<boolean>(false);
  const [selectedExamRequest, setSelectedExamRequest] = useState<ExamRequest>();

  const filteredExamRequests = examRequests?.filter((examRequest) =>
    examRequest.patient.full_name
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPatients();
    fetchExamRequests();

    const currentDate = new Date().toISOString().split("T")[0];
    setCurrentDate(currentDate);
    setExamRequest({ date: currentDate } as ExamRequest);
  }, []);

  const fetchExamRequests = () => {
    setListLoading(true);
    getExamRequests()
      .then((res) => setExamRequests(res))
      .catch((err) => setError(err))
      .finally(() => setListLoading(false));
  };

  const handleExamRequestModal = (examRequest: ExamRequest) => {
    setSelectedExamRequest(examRequest);
    setOpenExamRequestModal(true);
  };

  const fetchPatients = () => {
    getPatients()
      .then((res) => setPatients(res))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setExamRequest({
      ...examRequest,
      [e.target.name]: e.target.value,
    } as ExamRequest);
  };

  const handleAutocompleteChange = (
    _: React.SyntheticEvent<Element, Event>,
    option: Patient | null
  ) => {
    if (option) {
      setExamRequest({
        ...examRequest,
        patient_id: option.id,
      } as ExamRequest);
    }
  };

  const handleSubmit = () => {
    if (examRequest && examRequest.exams) {
      setLoading(true);
      createExamRequest(examRequest)
        .then(() => setSuccess(true))
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
          fetchExamRequests();
          setTimeout(() => {
            setError(false);
            setSuccess(false);
          }, 2000);
        });
    }
  };

  const handleDelete = (id: number | string) => {
    setListLoading(true);
    deleteExamRequest(id)
      .catch((err) => setError(err))
      .finally(() => {
        setListLoading(false);
        fetchExamRequests();
      });
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
          <Typography variant="h4">Requisição de exames</Typography>
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
            filteredExamRequests &&
            filteredExamRequests.length > 0 && (
              <DataGrid
                rows={filteredExamRequests}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
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
          <Typography variant="h4">Adicionar requisição de exame</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "32px" }}>
          <Autocomplete
            disablePortal
            options={patients || []}
            getOptionLabel={(option) => option.full_name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ marginBottom: "16px" }}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField variant="standard" {...params} label="Paciente" />
            )}
          />
          <TextField
            onChange={handleInputChange}
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Data"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            name="date"
            value={examRequest?.date || currentDate}
          />
          <TextField
            onChange={handleInputChange}
            variant="outlined"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Exames"
            name="exams"
            multiline
            rows={4}
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
              <Alert severity="error">
                Erro ao cadastrar requisição de exame.
              </Alert>
            </Box>
          )}
          {success && (
            <Box sx={{ paddingY: "32px" }}>
              <Alert severity="success">
                Requisição de exame cadastrado com sucesso!
              </Alert>
            </Box>
          )}
        </Box>
      </Paper>
      <Modal
        open={openExamRequestModal}
        content={
          selectedExamRequest && <ExamRequestPdf {...selectedExamRequest} />
        }
        title="Imprimir Receita"
        onClose={() => setOpenExamRequestModal(false)}
        width="600px"
      />
    </Box>
  );
};

export default ExamRequestsPage;
