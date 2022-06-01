
import { useAppDispatch } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { studentActions } from '../studentSlice';
import { Link, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Student } from 'models';
import studentApi from 'api/studentApi';
import StudentForm from '../components/StudentForm';
import { toast } from 'react-toastify';


export default function AddStudentList() {
    const history = useHistory();
    const { studentId } = useParams<{ studentId: string }>();
    const [student, setStudent] = useState<Student>();
    const dispatch = useAppDispatch();
    const isEdit = Boolean(studentId)
    useEffect(() => {
        if (!studentId) return;

        (async () => {
            try {
                const data: Student = await studentApi.getById(studentId);
                setStudent(data)

            } catch (err) {
                console.log('failed to fetch student details', err)
            }
        })();
    }, [studentId])

    const handleStudentFormSubmit = async (formValues: Student) => {
        if (isEdit) {
            await studentApi.update(formValues);
        } else {
            await studentApi.add(formValues);

        }
        // Toast success
        toast.success('Save student successfully')
        history.push('/admin/students')
    }

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student;
    return (
        <Box>
            <Link to="/admin/students">
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft /> &nbsp; Back to student list
                </Typography>
                <Typography variant="h4">{isEdit ? 'Update student info ' : 'Add new student'}</Typography>
            </Link>
            {(!isEdit || Boolean(student)) &&
                <Box>
                    <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
                </Box>
            }

        </Box>
    );
}
