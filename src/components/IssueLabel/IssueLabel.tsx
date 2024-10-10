import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getPatientsRange } from "../../shared/services/patients.service";
import Modal from "../Modal/Modal";
import { Label } from "../../shared/types/patient";
import LabelPdf from "../LabelPdf/LabelPdf";

interface Range {
  startId: number;
  endId: number;
}

const IssueLabel = () => {
  const [range, setRange] = useState<Range>();
  const [loading, setLoading] = useState<boolean>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [etiquetas, setEtiquetas] = useState<Label[]>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRange({
      ...range,
      [e.target.name]: e.target.value,
    } as Range);
  };

  const handleIssueLabel = () => {
    if (range?.startId && range.endId) {
      setLoading(true);
      getPatientsRange(range?.startId, range?.endId)
        .then((res) => {
          setOpenModal(true);
          setEtiquetas(res);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Box>
      <Typography paddingY="1%" variant="h4">
        Emitir etiquetas
      </Typography>
      <Typography paddingBottom="1%" variant="body2">
        Para emitir etiquetas é necessário informar um intervalo de códigos. Os
        pacientes contidos neste intervalo serão incluídos no documento de
        etiquetas.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: "250px" }}>
        <TextField
          sx={{ marginBottom: "16px" }}
          size="small"
          variant="standard"
          label="Primeiro código"
          name="startId"
          onChange={handleInputChange}
        />
        <TextField
          sx={{ marginBottom: "16px" }}
          size="small"
          variant="standard"
          label="Segundo código"
          name="endId"
          onChange={handleInputChange}
        />
        {loading && <CircularProgress sx={{ marginBottom: "16px" }} />}
        <Button
          disabled={loading}
          onClick={handleIssueLabel}
          variant="contained"
        >
          Emitir etiquetas
        </Button>
        <Modal
          title="Imprimir Etiquetas"
          content={<LabelPdf etiquetas={etiquetas || []} />}
          open={openModal}
          onClose={() => setOpenModal(false)}
          width="600px"
        />
      </Box>
    </Box>
  );
};

export default IssueLabel;
