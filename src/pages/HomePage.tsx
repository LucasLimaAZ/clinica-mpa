import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import MedicImg from "../assets/img/home-pic.jpg";
import NoteImg from "../assets/img/note.jpg";
import MedicationImg from "../assets/img/medication.jpg";
import PrescriptionImg from "../assets/img/prescription.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

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
              23
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Pacientes cadastrados
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
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
              46
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Remédios cadastrados
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
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
              24
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Receitas cadastradas
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
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
              55
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Recados cadastrados
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}
      >
        <Paper sx={{ padding: "2%" }}>
          <Typography pb="16px" variant="h3">
            Clínica M&PA
          </Typography>
          <Typography pb="16px" textAlign="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            vitae urna nunc. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Quisque sed neque eget
            enim efficitur mollis. Nunc facilisis tempor varius. Curabitur quis
            suscipit augue.
          </Typography>
          <Typography fontWeight="bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
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
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default HomePage;
