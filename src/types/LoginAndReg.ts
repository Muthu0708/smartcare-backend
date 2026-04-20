export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  role: "Patient" | "Doctor";
}

export interface LoginDTO {
  email: string;
  password: string;
}