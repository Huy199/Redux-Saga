
import { Box, Typography, Button, makeStyles, LinearProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { Pagination } from '@material-ui/lab';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilter from '../components/StudentFilter';
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },
    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(4)
    },
    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'

    }
}))
export default function ListPage() {
    const match = useRouteMatch();
    const history = useHistory();
    const studentList = useAppSelector(selectStudentList);
    const pagination = useAppSelector(selectStudentPagination);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);
    const filter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudentLoading);
    const dispatch = useAppDispatch();
    const classes = useStyles();
    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter))
    }, [dispatch, filter])

    const handlePageChange = (e: any, page: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page,

        }))
    }

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWidthDebounce(newFilter))
    }
    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter))
    }

    const handleRemoveStudent = async (student: Student) => {
        try {
            await studentApi.remove(student?.id || '')
            // Trigger to re-fetch student list witch curent filter
            toast.success('Remove student successfully!')

            const newFilter = { ...filter }
            dispatch(studentActions.setFilter(newFilter))

        } catch (error) {
            console.log('Failed to remove student', error)
        }
    }

    const handleEditStudent = async (student: Student) => {
        history.push(`${match.url}/${student.id}`)
    }

    return (
        <Box className={classes.root}>

            {loading && <LinearProgress className={classes.loading} />}
            <Box className={classes.titleContainer}>
                <Typography variant="h4">Student Management</Typography>
                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">Add new student</Button>
                </Link>
            </Box>
            <Box mb={3}>
                {/* Filter */}
                <StudentFilter
                    filter={filter}
                    cityList={cityList}
                    onSearchChange={handleSearchChange}
                    onChange={handleFilterChange}
                />
            </Box>

            {/* Student Table */}

            <StudentTable studentList={studentList} cityMap={cityMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent} />
            {/* Pagination */}
            <Box mt={2} display='flex' justifyContent='center'>

                <Pagination color='primary' count={Math.ceil(pagination?._totalRows / pagination?._limit)} page={pagination?._page} onChange={handlePageChange} />
            </Box>
        </Box>


    );
}
