import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

export default function SingleUser() {
  const classes = useStyles();
  const user = useSelector(state => state.user);

  console.log(user);
  return (
    <div className={classes.root}>
      <img src={user.imageUrl} style={{ width: 250, height: 250 }} />
      <Paper>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
      </Paper>
      <h3>{user.email}</h3>
      <p>{user.bio}</p>
    </div>
  );
}
