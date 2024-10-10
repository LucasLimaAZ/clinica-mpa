import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import MedicImg from "../assets/img/home-pic.jpg";
import NoteImg from "../assets/img/note.jpg";
import MedicationImg from "../assets/img/medication.jpg";
import PrescriptionImg from "../assets/img/prescription.jpg";
import { useNavigate } from "react-router-dom";
import IssueLabel from "../components/IssueLabel/IssueLabel";
import { useEffect, useState } from "react";
import { getCounters } from "../shared/services/home.service";

interface Counters {
  patients: number;
  messages: number;
  prescriptions: number;
  medications: number;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [counters, setCounters] = useState<Counters>();
  const [countersLoading, setCountersLoading] = useState<boolean>(true);

  useEffect(() => {
    getCounters()
      .then((res) => {
        setCounters(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setCountersLoading(false));
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          marginBottom: "32px",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Você possui
            </Typography>
            <Typography variant="h5" component="div">
              {!counters && countersLoading && <Skeleton width="32px" />}
              {counters?.patients}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Pacientes cadastrados
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Você possui
            </Typography>
            <Typography variant="h5" component="div">
              {!counters && countersLoading && <Skeleton width="32px" />}
              {counters?.medications}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Remédios cadastrados
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Você possui
            </Typography>
            <Typography variant="h5" component="div">
              {!counters && countersLoading && <Skeleton width="32px" />}
              {counters?.prescriptions}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Receitas cadastradas
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Você possui
            </Typography>
            <Typography variant="h5" component="div">
              {!counters && countersLoading && <Skeleton width="32px" />}
              {counters?.messages}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Recados cadastrados
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}
      >
        <Paper sx={{ padding: "2%", width: "100%" }}>
          <IssueLabel />
        </Paper>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <Card>
          <CardActionArea onClick={() => navigate("/pacientes")}>
            <CardMedia
              component="img"
              height="140"
              image={MedicImg}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Pacientes
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Tenha uma visão detalhada dos seus pacientes registrados. Clique
                aqui e acesse a tela de visualização de pacientes.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={() => navigate("/remedios")}>
            <CardMedia
              component="img"
              height="140"
              image={MedicationImg}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Remédios
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Tenha uma visão detalhada dos seus remédios registrados. Clique
                aqui e acesse a tela de visualização de remédios.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={() => navigate("/receitas")}>
            <CardMedia
              component="img"
              height="140"
              image={PrescriptionImg}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Receitas
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Tenha uma visão detalhada das suas receitas registradas. Clique
                aqui e acesse a tela de visualização de receitas.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={() => navigate("/recados")}>
            <CardMedia
              component="img"
              height="140"
              image={NoteImg}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Recados
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Tenha uma visão detalhada dos seus recados registrados. Clique
                aqui e acesse a tela de visualização de recados.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default HomePage;
