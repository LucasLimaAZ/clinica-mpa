import { getLocalToken } from "../helper";
import { Patient } from "../types/patient";
import api from "./http-client";

export const createPatient = async (patientData: Patient) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.post("/patient", patientData, { headers });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);
    throw error;
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
    console.error("Erro ao buscar pacientes:", error);
    throw error;
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
    console.error("Erro ao cadastrar paciente:", error);
    throw error;
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
    console.error("Erro ao excluir paciente:", error);
    throw error;
  }
};
