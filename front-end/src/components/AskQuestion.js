import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { blue } from '@material-ui/core/colors';
import { sizing } from '@material-ui/system';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15,
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  h3: {
      textAlign: 'center',
      verticalAlign: 'middle',
  },
  grido: {
      verticalAlign: 'middle'
  },
}));

export default function AskQuestion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>ask a qu</h1>
        </Grid>
        <Grid item xs={3}>
        <h3 className={classes.h3}>Question Title</h3>
        </Grid>
        <Grid item xs={9}>
            <input type="text"></input>
        </Grid>
        <Grid className={classes.grido} item xs={3}>
          <h3 className={classes.h3}>Question Text</h3>
        </Grid>
        <Grid item xs={9}>
            <TextField
            id="outlined-multiline-static"
            multiline
            rows={5}
            defaultValue="write your question here"
            variant="outlined"
            fullWidth="true"
            />
        </Grid>
        <Grid item xs={3}>
        <h3 className={classes.h3}>Keywords</h3>
        </Grid>
        <Grid item xs={9}>
            <input type="text"></input>
        </Grid>
      </Grid>
    </div>
  );
}