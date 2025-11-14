import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { loginUser } from "@/services/auth";
import { LoginData } from "@/types/login";

export const useLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = handleSubmit(async (data: LoginData) => {
        const response = await loginUser(data);
        if (response?.error) {
            try {
                const parsed = JSON.parse(response.error);
                setError(parsed.message);
            } catch {
                setError(response.error);
            }
        } else {
            router.push('/dashboard');
        }
    });

    return { register, onSubmit, errors, error };
};
