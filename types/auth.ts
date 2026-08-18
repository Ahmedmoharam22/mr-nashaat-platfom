export interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  parentPhone: string;
  grade: string;
  governorate: string;
}

export interface LoginFormData {
  phone: string;
  password: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;
export type RegisterFieldErrors = FieldErrors<RegisterFormData>;
export type LoginFieldErrors = FieldErrors<LoginFormData>;

export interface StepProps {
  formData: RegisterFormData;
  errors: RegisterFieldErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}