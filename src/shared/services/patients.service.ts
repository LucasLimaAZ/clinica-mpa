import { AxiosError } from "axios";
import { getLocalToken } from "../helper";
import { Patient } from "../types/patient";
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

export const createPatient = async (patientData: Patient) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.post("/patient", patientData, { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const getPatients = async () => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.get("/patient", { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const updatePatient = async (patientData: Patient) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.patch(
      `/patient/${patientData.id}`,
      patientData,
      { headers }
    );
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const deletePatient = async (patientData: Patient) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.delete(`/patient/${patientData.id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const getPatientsRange = async (startId: number, endId: number) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.get(`/patients/range/${startId}/${endId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};
