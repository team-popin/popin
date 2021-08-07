import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
// import { Link } from 'react-router-dom';
import { fetchProduct } from "../store/Product/subReducer/singleProduct";
import { fetchTimeSlotsForDates } from "../store/Product/subReducer/timeSlots";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    width: "80vw",
    // display: "flex",
    flexWrap: "wrap",
    //flexDirection: "row",
    margin: "5% 10% 3% 10%",
  },
  card1: {
    height: "100%",
    width: "80vw",
    margin: "0% 10% 3% 10%",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SingleProduct = (props) => {
  const classes = useStyles();

  const product = useSelector((state) => state.product);
  const selectedTimeSlots = useSelector((state) => state.selectedTimeSlots);
  const dispatch = useDispatch();

  const initialDates = {
    datePickerStart: '',
    datePickerEnd: ''
  }

  const [dates, setDates] = useState(initialDates);

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch]);

  const getTimeSlotsForDates = (id, datePickerStart, datePickerEnd) => {
    dispatch(fetchTimeSlotsForDates(id, datePickerStart, datePickerEnd));
  }

  const handleDatePicker = (e) => {
    const newDates = {...dates};
    newDates[e.target.name] = e.target.value;
    console.log(newDates);

    setDates(newDates);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {product.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Grid>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.imageUrl}
              title="Image title"
            />
            <CardContent>
              <Typography>{product.name}</Typography>
              <Typography>{product.price} $</Typography>
              {product.user ? (
                <Typography>
                  {product.user.firstName} {product.user.lastName}
                </Typography>
              ) : (
                <></>
              )}
            </CardContent>
          </Card>
          <Card className={classes.card1}>
            <CardContent>
              <Typography>{product.description}</Typography>
            </CardContent>
          </Card>
          <Card className={classes.card1}>
            <CardContent>
            <Typography>
              {`Time Slots for ${product.name}`}
            </Typography>
            <TextField type="date" name="datePickerStart" value={dates.datePickerStart} onChange={(e) => handleDatePicker(e)}/>
            <TextField type="date" name="datePickerEnd" value={dates.datePickerEnd} onChange={(e) => handleDatePicker(e)}/>
            {
            (dates.datePickerStart.length > 0 && dates.datePickerEnd.length > 0 && dates.datePickerStart <= dates.datePickerEnd)
            ? <Button variant="contained" color="secondary" onClick={() => getTimeSlotsForDates(product.id, dates.datePickerStart, dates.datePickerEnd)}>
              Get Time Slots
            </Button>
            : <Typography style={{color:"red"}} >Plese select correct dates</Typography>}
            <Grid>
              {(dates.datePickerStart && dates.datePickerEnd && selectedTimeSlots.length!==0)
              ? selectedTimeSlots.map ((timeSlot) => {
                return (
                  <Grid key={timeSlot.id}>
                    <Button
                      key={timeSlot.id}
                      variant="contained"
                      color="primary"
                    >
                      {timeSlot.dateTime.slice(0, 10)} {timeSlot.dateTime.slice(11, 16)}
                    </Button>
                  </Grid>
                )
              })
              : <Typography>Please select the date range to see available time slots.</Typography>}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </main>
    </React.Fragment>
  );
};

export default SingleProduct;
