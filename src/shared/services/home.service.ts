import { AxiosError } from "axios";
import { getLocalToken } from "../helper";
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

export const getCounters = async () => {
  const token = getLocalToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const [patients, medications, prescriptions, messages] = await Promise.all([
      api.get("/patients/count", { headers }),
      api.get("/medications/count", { headers }),
      api.get("/prescriptions/count", { headers }),
      api.get("/messages/count", { headers }),
    ]);

    return {
      patients: patients.data.total,
      medications: medications.data.total,
      prescriptions: prescriptions.data.total,
      messages: messages.data.total,
    };
  } catch (error) {
    handleUnauthorizedError(error as AxiosError);
  }
};
