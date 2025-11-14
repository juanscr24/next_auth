'use client'

import { useRegister } from "@/hooks/useRegister";

const RegisterForm = () => {
    const { register, onSubmit, errors } = useRegister();

    return (
        <form className="w-1/4" onSubmit={onSubmit}>
            <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

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

            <input type="password" placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            />
            {errors.confirmPassword && <span className="text-red-500">This field is required</span>}

            <button className="w-full bg-blue-500 text-white p-3 rounded-lg" type="submit">
                Register
            </button>
        </form>
    )
}

export default RegisterForm;
