import { AxiosError } from "axios";
import { getLocalToken } from "../helper";
import { Message } from "../types/message";
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

export const createMessage = async (messageData: Message) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.post("/message", messageData, { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const getMessages = async () => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.get("/message", { headers });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const updateMessage = async (messageData: Message) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.patch(
      `/message/${messageData.id}`,
      messageData,
      { headers }
    );
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};

export const deleteMessage = async (messageId: string | number) => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  try {
    const response = await api.delete(`/message/${messageId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};
