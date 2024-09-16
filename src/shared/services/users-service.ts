import { User } from "../types/user";
import api from "./http-client";

export const getUserInfo = async (token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get("/user", { headers });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};

export const createUser = async (userData: User) => {
  try {
    const response = await api.post("/user/register", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", { email, password });
    localStorage.setItem("clinica-api-token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Não foi possível logar o usuário:", error);
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("clinica-api-token");
  if (!token) return false;
  getUserInfo(token)
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });
};
