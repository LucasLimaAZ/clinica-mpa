import { AxiosError } from "axios";
import { getLocalToken } from "../helper";
import { Medication } from "../types/medication";
import api from "./http-client";

const handleUnauthorizedError = (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    console.error("Não autorizado: redirecionando para /login");
    sessionStorage.removeItem("authorization");
    window.location.reload();
  } else {
    console.error("Erro:", error);
    throw error;
  }
};

export const createMedication = async (medicationData: Medication) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.post("/medication", medicationData, { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const getMedications = async () => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.get("/medication", { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const updateMedication = async (medicationData: Medication) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.patch(
      `/medication/${medicationData.id}`,
      medicationData,
      { headers }
    );
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const deleteMedication = async (medicationId: string | number) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.delete(`/medication/${medicationId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};
