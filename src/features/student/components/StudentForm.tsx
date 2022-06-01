import React from 'react';
import { Student } from 'models';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import SelectField from 'components/FormFields/SelectField';

export interface IStudentFormProps {
    initialValues?: Student;
    onSubmit?: (formValues: Student) => void;
}
export default function StudentForm({ initialValues, onSubmit }: IStudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);
    const { control, handleSubmit } = useForm<Student>({
        defaultValues: initialValues,
    });

    const handleFormSubmit = (formValues: Student) => {
        console.log('Submit', formValues)
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
                <SelectField name="city" control={control} label="City" options={cityOptions} />

                <Box mt={3}>
                    <Button type="submit" variant='contained' color='primary'>Save</Button>
                </Box>
            </form>
        </Box>
    )
}
