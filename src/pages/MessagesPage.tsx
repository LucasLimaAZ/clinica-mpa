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
import { Message } from "../shared/types/message";
import { useEffect, useState } from "react";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "../shared/services/messages.service";
import { Delete } from "@mui/icons-material";
import { Patient } from "../shared/types/patient";
import { getPatients } from "../shared/services/patients.service";

const MessagesPage = () => {
  const columns: GridColDef<Message[][number]>[] = [
    {
      field: "patient_id",
      headerName: "Número",
      width: 80,
      valueGetter: (_, row) => row?.patient?.id,
    },
    {
      field: "date",
      headerName: "Data",
      width: 100,
    },
    {
      field: "patient_full_name",
      headerName: "Nome",
      width: 200,
      valueGetter: (_, row) => row?.patient?.full_name,
    },
    {
      field: "patient_phone",
      headerName: "Telefone",
      width: 200,
      valueGetter: (_, row) => row?.patient?.phone,
    },
    {
      field: "message",
      headerName: "Recado",
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

  const [messages, setMessages] = useState<Message[]>();
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [message, setMessage] = useState<Message>();
  const [patients, setPatients] = useState<Patient[]>();
  const [currentDate, setCurrentDate] = useState<string>("");

  const filteredMessages = messages?.filter((message) =>
    message.patient_id
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchPatients();
    fetchMessages();

    const currentDate = new Date().toISOString().split("T")[0];
    setCurrentDate(currentDate);
    setMessage({ date: currentDate } as Message);
  }, []);

  const fetchMessages = () => {
    setListLoading(true);
    getMessages()
      .then((res) => setMessages(res))
      .catch((err) => setError(err))
      .finally(() => setListLoading(false));
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
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    } as Message);
  };

  const handleAutocompleteChange = (
    _: React.SyntheticEvent<Element, Event>,
    option: Patient | null
  ) => {
    if (option) {
      setMessage({
        ...message,
        patient_id: option.id,
      } as Message);
    }
  };

  const handleSubmit = () => {
    if (message && message.message) {
      setLoading(true);
      createMessage(message)
        .then(() => setSuccess(true))
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
          fetchMessages();
          setTimeout(() => {
            setError(false);
            setSuccess(false);
          }, 2000);
        });
    }
  };

  const handleDelete = (id: number | string) => {
    setListLoading(true);
    deleteMessage(id)
      .catch((err) => setError(err))
      .finally(() => {
        setListLoading(false);
        fetchMessages();
      });
  };

  return (
    <Box display="flex" justifyContent="space-between" gap="16px">
      <Paper sx={{ width: "70%" }}>
        <Box sx={{ padding: "32px" }}>
          <Typography variant="h4">Recados</Typography>
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
          {!listLoading && filteredMessages && filteredMessages.length > 0 && (
            <DataGrid
              rows={filteredMessages}
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
          <Typography variant="h4">Adicionar recado</Typography>
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
            value={message?.date || currentDate}
          />
          <TextField
            onChange={handleInputChange}
            variant="standard"
            sx={{ marginBottom: "16px" }}
            fullWidth
            label="Recado"
            name="message"
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
              <Alert severity="error">Erro ao cadastrar recado.</Alert>
            </Box>
          )}
          {success && (
            <Box sx={{ paddingY: "32px" }}>
              <Alert severity="success">Recado cadastrado com sucesso!</Alert>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MessagesPage;
