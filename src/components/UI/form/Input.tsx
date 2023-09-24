import { useState } from 'react';

interface InputProps {
    value: any;
    label?: string;
    type: string;
    id: string, 
    placeholder: string,
    autoComplete?: string,
    className?: string,  
    required?: boolean,
    // error?: string,
    onChange: (value: any, err: string) => void,
    validationFn?: (value: any) => string
}

interface FormInput {
    value: any,
    onChange: (value: any) => any,
    validate: (value: any) => string
}

export function useFormInput(initialValue: any, validationFn?: (value: any) => string): FormInput {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: any) => {
        const newValue = e.target.value;
        setValue(newValue);
    }

    const validate = (value: any): string => {
        let validationError = '';
        if(!!validationFn) {
            validationError = validationFn(value);
        }
        return validationError;
    }

    return {value, onChange: handleChange, validate: validate};
}

function Input({ required = false, 
                className = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                ...props}: InputProps) {

    const formInput = useFormInput(props.value, props.validationFn);

    const [inputValue] = useState();
    const [error, setError] = useState('');

    const handleInputChange = (e: any) => {
        const newValue = e.target.value;
        formInput.onChange(e);
        const validationError = (required && !newValue) 
            ? `Il campo ${props.label} è obbligatorio` 
            : formInput.validate(newValue); 

        setError(validationError || '');
        
        
        props.onChange(newValue, validationError);
    };
    

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-between">
            {!!props.label && <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {props.label}
            </label>}
            </div>
            <input
                id={props.id}
                aria-describedby={props.label}
                autoComplete={props.autoComplete || 'off'}
                type={props.type}
                className={className}
                placeholder={props.placeholder}
                value={inputValue}
                onChange={handleInputChange}
            />
            { error && <p className="text-red-500">{error}</p> }
        </div>
        )
}

export default Input;