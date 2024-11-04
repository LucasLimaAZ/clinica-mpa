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
  phone: string;
  mobile_phone: string;
  business_phone: string;
  file_location?: string;
};
