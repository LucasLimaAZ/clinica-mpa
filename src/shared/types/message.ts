export type Message = {
  id: number;
  patient_id: number;
  message: string;
  date: string;
  patient: Patient;
};

type Patient = {
  id: number;
  full_name: string;
  phone: number;
};
