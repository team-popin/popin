import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/Product/allProducts";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getCategories } from "../store/Product/category";

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
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    marginLeft: "175px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AllProducts = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const classes = useStyles();
  //
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const [category, setCategory] = React.useState("0");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  //
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {user.firstName ? `Welcome, ${user.firstName}!` : "Welcome!"}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Pick a category from the drop down menu to get started with a
              session from professionals from around the world!
            </Typography>

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
                {categories.map((categoryB) => 
                  (<MenuItem key={categoryB.id} value={categoryB.id}>
                    {categoryB.name}
                  </MenuItem>)
                )}
              </Select>
            </FormControl>
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Trending services
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (category==="0" || category===product.categoryId) ? (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={product.name}
                    subheader={`$${product.price} per session`}
                  />
                  <CardMedia
                    className={classes.media}
                    image={product.imageUrl}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Link to={`/product/${product.id}`}>
                      <Button variant="contained" color="primary">
                        Schedule
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ):<></>)}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default AllProducts;
