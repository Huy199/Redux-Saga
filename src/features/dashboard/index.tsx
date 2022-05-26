import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, People, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics, selectHighestStudentList, selectLowestStudentList, selectRankingByCityList } from './dashboardSlice';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: 'absolute',
    paddingTop: theme.spacing(-1),
    width: '100%'
  },
}))
export default function Dashboard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  const classes = useStyles();

  console.log({
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCityList
  })

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
    console.log(dashboardActions.fetchData.type)
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            label="male"
            value={statistics.maleCount}
            icon={<PeopleAlt fontSize='large' color='primary' />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            label="female"
            value={statistics.femaleCount}
            icon={<ChatRounded fontSize='large' color='primary' />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            label="mark >= 8"
            value={statistics.highMarkCount}
            icon={<ChatBubble fontSize='large' color='primary' />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            label="mark <= 5"
            value={statistics.lowMarkCount}
            icon={<LinearScaleSharp fontSize='large' color='primary' />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
