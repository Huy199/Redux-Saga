import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, makeStyles, Paper } from '@material-ui/core';
import { Student } from 'models';
import React from 'react';


const useStyles = makeStyles({
    table: {

    },
})
export interface StudenRankingtListProps {
    studentList: Student[]
}


export default function StudenRankingtList({ studentList }: StudenRankingtListProps) {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table className={classes.table} size='small' aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Mark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell align="center"> {index + 1}</TableCell>
                            <TableCell align="left">{student.name}</TableCell>
                            <TableCell align="right">{student.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}