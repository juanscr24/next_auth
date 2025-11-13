'use client'
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"


interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()
    const onSubmit = handleSubmit(async (data: RegisterFormData) => {

        // Validación de que las contraseñas coinciden
        if (data.password !== data.confirmPassword) {
            console.error("Passwords do not match.");
            return;
        }

        try {
            // Realizamos la solicitud POST usando axios
            const response: AxiosResponse = await axios.post('/api/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword
            });

            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                router.push('/login'); // Redirigir a la página de login después del registro exitoso
            }
        } catch (error: any) {
            // Manejo de errores de la solicitud
            if (axios.isAxiosError(error)) {
                // Si el error es una respuesta de Axios (por ejemplo, un error 400 o 500)
                console.log('Server Error:', error.response?.data);
            } else {
                // Si hubo un error en la configuración de la solicitud o en otro lugar
                console.log('An error occurred:', error.message);
            }
        }
    });


    return (
        <div className="h-dvh flex justify-center items-center">
            <form className="w-1/4" onSubmit={onSubmit}>
                <h1
                    className="text-slate-200 font-bold text-4xl mb-4">
                    Register
                </h1>
                <input type="text" placeholder="Username"
                    {...register("username", { required: true })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.username && <span className="text-red-500">This field is required</span>}
                <input type="email" placeholder="Email"
                    {...register("email", { required: true })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
                <input type="password" placeholder="Password"
                    {...register("password", { required: true })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.password && <span className="text-red-500">This field is required</span>}
                <input type="password" placeholder="confirmPassword"
                    {...register("confirmPassword", { required: true })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                />
                {errors.confirmPassword && <span className="text-red-500">This field is required</span>}
                <button
                    className="w-full bg-blue-500 text-white p-3 rounded-lg"
                    type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage