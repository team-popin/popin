import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "30px",
    backgroundColor: "#cdeac0",
  },
  text1: {
    fontSize: "25px",
    margin: "5px 0px 10px 30px",
  },
  text2: {
    fontSize: "20px",
    margin: "5px 0px 10px 30px",
  },
}));
export default function OrderSuccessful() {
  let history = useHistory();
  let [timer, setTimer] = React.useState(5);
  let count = 5;
  const classes = useStyles();
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push("/");
    }, 5000);
    const timer2 = setTimeout(() => {
      return count--;
    }, 5000);
    return () => clearTimeout(timer, timer2);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Grid>
          <Card className={classes.root}>
            <Typography className={classes.text1}>Order Successful</Typography>
            <Typography className={classes.text2}>
              Thank you for your order!
            </Typography>
            <Typography className={classes.text2}>
              You will be redirected in {setTimeout(()=>{setTimer(state=>state-1)},5000)} seconds.
            </Typography>
          </Card>
        </Grid>
      </main>
    </React.Fragment>
  );
}
