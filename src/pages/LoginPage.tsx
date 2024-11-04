import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { login } from "../shared/services/users.service";
import { AuthError } from "../shared/types/user";
import { useNavigate } from "react-router-dom";
import { setLocalToken } from "../shared/helper";
import Modal from "../components/Modal/Modal";

const LoginPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<AuthError>();
  const [isResetPassModalOpen, setResetPassModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (email && password) {
      setIsLoading(true);
      setError(undefined);

      login(email, password)
        .then((res) => {
          setLocalToken(res.token);
          navigate("/");
        })
        .catch((err) => {
          setError({ isError: true, errorMessage: "Credenciais inválidas." });
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleForgotMyPassword = () => {
    setResetPassModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "rgb(245, 245, 245)",
      }}
    >
      <Paper
        sx={{
          width: "30%",
          marginTop: "10%",
          padding: "2%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography marginBottom="32px" variant="h4">
          Clinica M&PA
        </Typography>
        <TextField
          onChange={handleEmailChange}
          value={email || ""}
          sx={{ marginBottom: "8px" }}
          label="Email"
          required
          variant="standard"
        />
        <TextField
          onChange={handlePasswordChange}
          value={password || ""}
          sx={{ marginBottom: "8px" }}
          label="Senha"
          type="password"
          required
          variant="standard"
        />
        {isLoading && <CircularProgress sx={{ marginTop: "16px" }} />}
        <Button
          sx={{ marginTop: "32px" }}
          disabled={isLoading}
          onClick={handleLogin}
          variant="contained"
        >
          Acessar
        </Button>
        <Button sx={{ marginTop: "32px" }} onClick={handleForgotMyPassword}>
          Esqueci minha senha
        </Button>
        {error?.isError && (
          <Alert sx={{ marginTop: "8px" }} severity="error">
            {error.errorMessage}
          </Alert>
        )}
        <Modal
          onClose={() => setResetPassModalOpen(false)}
          open={isResetPassModalOpen}
          title="Recuperar senha"
          content={
            <Box>
              <Typography>
                Para recuperar sua senha informe seu endereço de email:{" "}
              </Typography>
              <TextField
                fullWidth
                sx={{ marginTop: "16px" }}
                size="small"
                label="Email"
              />
              <Button
                variant="contained"
                sx={{ marginTop: "16px" }}
                onClick={() => setResetPassModalOpen(false)}
              >
                Enviar
              </Button>
              <Box sx={{ marginTop: "32px" }}>
                <Typography variant="caption">
                  Você receberá instruções no seu Email para recuperar sua
                  senha.
                </Typography>
              </Box>
            </Box>
          }
        ></Modal>
      </Paper>
    </Box>
  );
};

export default LoginPage;
