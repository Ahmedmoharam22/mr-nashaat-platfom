import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { LoginFormData, LoginFieldErrors } from "@/types/auth";
import { loginSchema } from "../schemas/auth.schema";

const INITIAL_LOGIN_DATA: LoginFormData = {
  phone: "",
  password: "",
};

export function useLoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>(INITIAL_LOGIN_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const validate = (): boolean => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: LoginFieldErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof LoginFormData;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("يرجى إدخال البيانات بشكل صحيح.");
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setServerError("");

    try {
      const res = await signIn("credentials", {
        phone: formData.phone.trim(),
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        const errorMessage = "بيانات الدخول غير صحيحة. يرجى التأكد من رقم الهاتف وكلمة المرور.";
        setServerError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success("تم تسجيل الدخول بنجاح!");
        router.push("/dashboard");
        router.refresh();
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
    formData,
    showPassword,
    errors,
    isLoading,
    serverError,
    handleChange,
    toggleShowPassword,
    handleSubmit,
  };
}
