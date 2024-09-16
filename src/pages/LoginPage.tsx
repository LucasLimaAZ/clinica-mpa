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
import { login } from "../shared/services/users-service";
import { AuthError } from "../shared/types/user";
import { useNavigate } from "react-router-dom";
import { setLocalToken } from "../shared/helper";

const LoginPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<AuthError>();
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "rgb(250, 250, 250)",
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
        {isLoading && <CircularProgress sx={{ padding: "4%" }} />}
        <Button
          sx={{ marginTop: "32px" }}
          disabled={isLoading}
          onClick={handleLogin}
          variant="contained"
        >
          Acessar
        </Button>
        {error?.isError && (
          <Alert sx={{ marginTop: "8px" }} severity="error">
            {error.errorMessage}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
