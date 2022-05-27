import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, makeStyles, Paper, Button, useTheme } from '@material-ui/core';
import { Student } from 'models';
import React from 'react';


const useStyles = makeStyles(theme => ({
    table: {

    },
    eidt: {
        marginRight: theme.spacing(1),
    },
}))
export interface StudentTableProps {
    studentList: Student[],
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}


export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProps) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} >
            <Table className={classes.table} size='small' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Mark</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell> {student.id}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.gender}</TableCell>
                            <TableCell>{student.mark}</TableCell>
                            <TableCell>{student.city}</TableCell>
                            <TableCell align="right">
                                <Button size='small' className={classes.eidt} color="primary" onClick={() => onEdit?.(student)}>Edit</Button>
                                <Button variant="contained" color="secondary" onClick={() => onRemove?.(student)}>Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}