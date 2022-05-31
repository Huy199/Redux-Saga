import { Table, DialogTitle, DialogContent, DialogActions, DialogContentText, TableContainer, TableHead, TableRow, TableCell, TableBody, makeStyles, Paper, Button, useTheme, Box, Dialog } from '@material-ui/core';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';


const useStyles = makeStyles(theme => ({
    table: {

    },
    eidt: {
        marginRight: theme.spacing(1),
    },
}))
export interface StudentTableProps {
    studentList: Student[],
    cityMap: {
        [key: string]: City;
    }
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}


export default function StudentTable({ studentList, onEdit, cityMap, onRemove }: StudentTableProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>();

    const handleRemoveClick = (student: Student) => {
        setSelectedStudent(student);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);

    }

    const handleRemoveConfirm = (student: Student) => {
        onRemove?.(student)
        setOpen(false);
    }


    return (
        <>

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
                                <TableCell>{capitalizeString(student.gender)}</TableCell>
                                <TableCell >
                                    <Box color={getMarkColor(student.mark)}> {student.mark}</Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align="right">
                                    <Button size='small' className={classes.eidt} color="primary" onClick={() => onEdit?.(student)}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleRemoveClick(student)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
            {/* Remove dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Remove a Student?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove student name <b>{selectedStudent?.name}</b>.<br />
                        This action can&apos;t be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary' variant='outlined'>Cancel</Button>
                    <Button onClick={() => handleRemoveConfirm(selectedStudent as Student)} color='secondary' variant='contained'>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}