import { AxiosError } from "axios";
import { getLocalToken } from "../helper";
import { ExamRequest } from "../types/exam-request";
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

export const createExamRequest = async (examRequestData: ExamRequest) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.post("/exam-request", examRequestData, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const getExamRequests = async () => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.get("/exam-request", { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const updateExamRequest = async (examRequestData: ExamRequest) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.patch(
      `/exam-request/${examRequestData.id}`,
      examRequestData,
      { headers }
    );
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const deleteExamRequest = async (examRequestId: string | number) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await api.delete(`/exam-request/${examRequestId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};
