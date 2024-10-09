import { AxiosError } from "axios";
import { getLocalToken } from "../helper";
import { Prescription } from "../types/prescription";
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

export const createPrescription = async (prescriptionData: Prescription) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.post("/prescription", prescriptionData, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const getPrescriptions = async () => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.get("/prescription", { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const updatePrescription = async (prescriptionData: Prescription) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.patch(
      `/prescription/${prescriptionData.id}`,
      prescriptionData,
      { headers }
    );
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const deletePrescription = async (prescriptionId: string | number) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.delete(`/prescription/${prescriptionId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};
