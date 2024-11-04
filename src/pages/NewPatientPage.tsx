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
import { Patient } from "../shared/types/patient";
import { useEffect, useState } from "react";
import {
  createPatient,
  deletePatient,
  updatePatient,
} from "../shared/services/patients.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../components/Modal/Modal";

const NewPatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchParams] = useSearchParams();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const id = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const patient = sessionStorage.getItem("patient");
      if (patient) {
        setEdit(true);
        setPatient(JSON.parse(patient));
      }
    }
  }, []);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    } as Patient);
  };

  const handleSexoChange = (
    _: React.SyntheticEvent<Element, Event>,
    option: { label: string; id: string } | null
  ) => {
    if (option) {
      setPatient({
        ...patient,
        genre: option.id,
      } as Patient);
    }
  };

  const handleSubmit = () => {
    if (patient && patient.full_name) {
      setLoading(true);

      if (edit) {
        updatePatient(patient)
          .then(() => setSuccess(true))
          .catch((err) => setError(err))
          .finally(() => {
            setLoading(false);
            setTimeout(() => {
              setError(false);
              setSuccess(false);
            }, 2000);
          });
      } else {
        createPatient(patient)
          .then(() => setSuccess(true))
          .catch((err) => setError(err))
          .finally(() => {
            setLoading(false);
            setTimeout(() => {
              setError(false);
              setSuccess(false);
            }, 2000);
          });
      }
    }
  };

  const handleDelete = () => {
    if (patient) {
      setLoading(true);
      deletePatient(patient)
        .then(() => navigate("/pacientes"))
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            setError(false);
          }, 2000);
        });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: { lg: "50%", xs: "100%" } }}>
        <Typography sx={{ padding: "4%" }} variant="h4">
          {edit ? "Editar" : "Cadastrar novo"} paciente
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
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.full_name}
              name="full_name"
              variant="standard"
              fullWidth
              label="Nome completo"
            />
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.responsible}
              name="responsible"
              variant="standard"
              fullWidth
              label="Responsável"
            />
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
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.phone}
              variant="standard"
              fullWidth
              label="Telefone"
              name="phone"
            />
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.mobile_phone}
              variant="standard"
              fullWidth
              label="Celular"
              name="mobile_phone"
            />
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
            <Autocomplete
              fullWidth
              disablePortal
              options={[
                { label: "Masculino", id: "Masculino" },
                { label: "Feminino", id: "Feminino" },
                { label: "Não informado", id: "Não informado" },
              ]}
              getOptionLabel={(option) => option.id}
              onChange={handleSexoChange}
              sx={{ marginBottom: "16px" }}
              renderInput={(params) => (
                <TextField variant="standard" {...params} label="Sexo" />
              )}
            />
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.business_phone}
              name="business_phone"
              variant="standard"
              fullWidth
              label="Telefone comercial"
            />
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
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.address}
              name="address"
              variant="standard"
              fullWidth
              label="Endereço"
            />
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.neighborhood}
              name="neighborhood"
              variant="standard"
              fullWidth
              label="Bairro"
            />
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
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.uf}
              name="uf"
              variant="standard"
              fullWidth
              label="UF"
            />
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.cep}
              name="cep"
              variant="standard"
              fullWidth
              label="CEP"
            />
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.city}
              name="city"
              variant="standard"
              fullWidth
              label="Cidade"
            />
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
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.referral}
              name="referral"
              variant="standard"
              fullWidth
              label="Indicação"
            />
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.file_location}
              name="file_location"
              variant="standard"
              fullWidth
              label="Localização da ficha"
            />
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
            <TextField
              slotProps={{ inputLabel: { shrink: edit ? true : undefined } }}
              onChange={handleInputChange}
              value={patient?.observations}
              name="observations"
              variant="standard"
              fullWidth
              label="Observações"
            />
          </Box>
          {loading && (
            <Box sx={{ padding: "4%" }}>
              <CircularProgress />
            </Box>
          )}
          <Box
            sx={{
              padding: "4%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              disabled={loading}
              onClick={handleSubmit}
              variant="contained"
            >
              Salvar
            </Button>
            {edit && (
              <Button
                disabled={loading}
                onClick={() => setShowConfirmDelete(true)}
                variant="contained"
                color="error"
              >
                Excluir
              </Button>
            )}
          </Box>
          {error && (
            <Box sx={{ paddingBottom: "32px", paddingX: "4%" }}>
              <Alert severity="error">
                Erro ao {edit ? "atualizar" : "cadastrar"} paciente.
              </Alert>
            </Box>
          )}
          {success && (
            <Box sx={{ paddingBottom: "32px", paddingX: "4%" }}>
              <Alert severity="success">
                Paciente {edit ? "atualizado" : "cadastrado"} com sucesso!
              </Alert>
            </Box>
          )}
        </Box>
      </Paper>
      <Modal
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        title="Deseja excluir esse paciente?"
        content="Tem certeza que deseja excluir todos os dados deste paciente? Essa ação é permanente!"
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default NewPatientPage;
