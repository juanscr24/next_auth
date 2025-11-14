import { UseFormRegister, FieldValues } from "react-hook-form";

export interface TextInputProps {
    label?: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
}