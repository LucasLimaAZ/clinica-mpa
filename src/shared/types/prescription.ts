import { Patient } from "./patient";

export type Prescription = {
  id: number;
  patient_id: number;
  medication: string;
  amount: string;
  how_to_use: string;
  date: string;
  patient: Patient;
};
