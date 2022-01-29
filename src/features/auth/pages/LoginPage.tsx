import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authAction, selectIsLogging } from '../authSlice';
const useStyles = makeStyles((themes) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: themes.spacing(2),
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);
  const handleLoginClick = () => {
    //TODO: get username + pass from login form
    dispatch(
      authAction.login({
        username: '',
        password: '',
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
