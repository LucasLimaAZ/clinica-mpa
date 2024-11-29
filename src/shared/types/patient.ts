export type Patient = {
  id: number;
  full_name: string;
  responsible: string;
  referral: string;
  genre: string;
  phone: string;
  mobile_phone: string;
  business_phone: string;
  address: string;
  cep: string;
  city: string;
  uf: string;
  neighborhood: string;
  observations: string;
  file_location: string;
  file_number: number;
  created_at: string | Date;
};

export type Label = {
  file_number: number;
  full_name: string;
};
