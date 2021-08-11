import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postProduct } from "../store/Product/allProducts";
import { getCategories } from "../store/Product/category";
import {addTimeSlotForProduct}  from "../store/Product/timeSlots"

import { fetchProducts } from "../store/Product/allProducts";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "86vw",
  },
  selectEmpty: {
    margginTop: theme.spacing(2),
  },
  frame: {
    margin: "5% 5% 1% 5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "30px",
    backgroundColor: "#3f50b5",
    borderRadius: "10px",
    width: "200px",
    color: "white",
    textAlign: "center",
    margin: "20px 15px 30px 15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "86vw",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AddProduct = () => {
  const categories = useSelector((state) => state.categories);
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  
  useEffect(() => {
    
  })
  
  const [category, setCategory] = React.useState("0");

  const handleChange = (event) => {
    setCategory(event.target.value);

  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  const handleSubmit = async(evt) => {
    evt.preventDefault();
    const nameF = evt.target.name.value;
    const priceF = evt.target.price.value;
    const descriptionF = evt.target.description.value;
    const imageUrlF = evt.target.imageUrl.value;
    await dispatch(
      postProduct({
        name: nameF,
        price: priceF,
        description: descriptionF,
        categoryId: category,
        imageUrl: imageUrlF,
        userId: user.id,
      }, selectedDate), 
    );
  };
  

  const [selectedDate, setSelectedDate] = React.useState(
    Date.now()
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid>
        <Card className={classes.frame}>
          <Typography className={classes.title}>Add product</Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="0">
                <em>All</em>
              </MenuItem>
              {categories.map((categoryB) => (
                <MenuItem key={categoryB.id} value={categoryB.id}>
                  {categoryB.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
            name={name}
          >
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="price"
              id="price"
              autoComplete="current-password"
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="imageUrl"
              label="Image url"
              type="imageUrl"
              id="imageUrl"
              autoComplete="current-password"
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
              autoComplete="current-password"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ width: "200px", margin: "10px 10px 20px 10px" }}
              className={classes.submit}
            >
              Create
            </Button>
          </form>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default AddProduct;