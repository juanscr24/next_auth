import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import { RegisterData } from "@/types/register";

export const useRegister = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();

    const onSubmit = handleSubmit(async (data: RegisterData) => {
        if (data.password !== data.confirmPassword) {
            console.error("Passwords do not match.");
            return;
        }

        try {
            const response = await registerUser(data);
            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                router.push('/login');
            }
        } catch (err: any) {
            console.error('Registration error:', err.message || err);
        }
    });

    return { register, onSubmit, errors };
};
