'use client'

import { useLogin } from "@/hooks/useLogin";

const LoginForm = () => {
    const { register, onSubmit, errors, error } = useLogin();

    return (
        <form onSubmit={onSubmit} className="w-1/4">
            {error && <p className="p-2 mb-3 text-xs rounded bg-red-500 w-full">{error}</p>}
            <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

            <input type="email" placeholder="Email"
                {...register("email", { required: true })}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            />
            {errors.email && <span className="text-red-500">This field is required</span>}

            <input type="password" placeholder="******"
                {...register("password", { required: true })}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            />
            {errors.password && <span className="text-red-500">This field is required</span>}

            <button className="w-full bg-blue-500 text-white p-3 rounded-lg" type="submit">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
