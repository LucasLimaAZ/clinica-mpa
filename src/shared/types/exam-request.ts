export interface ExamRequest {
  id: number;
  date: Date | string;
  exams: string;
  patient: Patient;
  patient_id: number;
}

type Patient = {
  id: number;
  full_name: string;
  phone: number;
};
