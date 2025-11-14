import axios, { AxiosResponse } from 'axios';
import { RegisterData } from '@/types/register';
import { signIn } from 'next-auth/react';
import { LoginData } from '@/types/login';

export const loginUser = async (data: LoginData) => {
    const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
    });
    return response;
};


export const registerUser = async (data: RegisterData) => {
    try {
        const response: AxiosResponse = await axios.post('/api/auth/register', data);
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { message: 'Server error' };
        } else {
            throw { message: error.message };
        }
    }
};

