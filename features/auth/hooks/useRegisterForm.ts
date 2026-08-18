import { useState } from "react";
import { toast } from "react-hot-toast";
import { RegisterFormData, RegisterFieldErrors } from "@/types/auth";
import {
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
} from "../schemas/auth.schema";

const INITIAL_FORM_DATA: RegisterFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
  confirmPassword: "",
  parentPhone: "",
  grade: "",
  governorate: "",
};

export function useRegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<RegisterFieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    let result;
    if (currentStep === 1) result = registerStep1Schema.safeParse(formData);
    if (currentStep === 2) result = registerStep2Schema.safeParse(formData);
    if (currentStep === 3) result = registerStep3Schema.safeParse(formData);

    if (result && !result.success) {
      const fieldErrors: RegisterFieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof RegisterFormData;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("يرجى تصحيح الأخطاء قبل المتابعة.");
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrors({});
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);
    setServerError("");

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        parentPhone: formData.parentPhone?.trim() || undefined,
        grade: formData.grade,
        governorate: formData.governorate,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessage = data.error || "حدث خطأ أثناء التسجيل.";
        setServerError(errorMessage);
        toast.error(errorMessage);
      } else {
        setSubmitSuccess(true);
        toast.success("تم إنشاء الحساب بنجاح!");
      }
    } catch {
      const errorMessage = "تعذّر الاتصال بالخادم. يرجى المحاولة مرة أخرى.";
      setServerError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    formData,
    errors,
    isLoading,
    submitSuccess,
    serverError,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  };
}