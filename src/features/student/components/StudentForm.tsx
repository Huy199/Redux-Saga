import React, { useState } from 'react';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import SelectField from 'components/FormFields/SelectField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Alert } from '@material-ui/lab';



export interface IStudentFormProps {
    initialValues?: Student;
    onSubmit?: (formValues: Student) => void;
}
export default function StudentForm({ initialValues, onSubmit }: IStudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);
    const [error, setError] = useState<string>('');
    const schema = yup.object({
        name: yup
            .string()
            .test(
                'two-words',
                'Please enter at least two words',
                (value) => {
                    if (!value) return true;

                    const parts = value.split(' ') || [];
                    return parts.filter(x => !!x).length >= 2

                }
            )
            .required('Please enter name'),
        age: yup
            .number()
            .positive('Please enter a positive number.')
            .integer('Please enter a integer.')
            .required('Please enter age.')
            .min(0, 'Min is 0')
            .max(100, 'Max is 100')
            .typeError('Please enter a valid number'),
        mark: yup
            .number()
            .min(0, 'Min is 0')
            .max(10, 'Max is 10')
            .required('Please enter mark.')
            .typeError('Please enter a valid number'),
        gender: yup
            .string()
            .oneOf(['male', 'female'], 'Please select either male of female.')
            .required('Please select gender'),
        city: yup
            .string()
            .required('Please select city.')
    }).required();

    const { control, handleSubmit, formState: { isSubmitting } } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues: Student) => {
        // await new Promise((resolve, reject) => {
        //     setTimeout(resolve, 3000)
        // })

        try {
            setError('')
            await onSubmit?.(formValues)

        } catch (error) {
            setError('Failed to submit');
        }
    }
    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Form Fields */}
                <InputField name="name" control={control} label="Full name" />
                <RadioGroupField
                    name="gender"
                    control={control}
                    label="Gender"
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />
                <InputField name="age" control={control} label="Age" type="number" />
                <InputField name="mark" control={control} label="Mark" type="number" />
                {Array.isArray(cityOptions) && cityOptions.length > 0 &&
                    <SelectField name="city" control={control} label="City" options={cityOptions} />
                }

                {error && <Alert severity="error">{error}</Alert>}

                <Box mt={3}>
                    <Button type="submit" variant='contained' color='primary' disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress color='primary' size={16} />} &nbsp;Save
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
