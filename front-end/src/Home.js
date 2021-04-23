import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import './Home.css';
import SignIn from './SignIn';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Ask Me Anything
            </Typography>
            <Popup
            trigger={open =><Button color="inherit" >Login</Button>}
            modal
            >
              <SignIn/>
            </Popup>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Grid container>
          <Grid item xs={2}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid>
      </div>
      <Button color="inherit" >Login</Button>
    </div>
    
  );
}
export default Home;