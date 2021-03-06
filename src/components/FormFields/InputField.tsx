import React, { InputHTMLAttributes } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
}
export default function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
    })
    return (
        <TextField
            fullWidth
            variant='outlined'
            margin='normal'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
            size="small"
        />
    )
}
