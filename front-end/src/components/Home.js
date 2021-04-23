import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popup from 'reactjs-popup';
import './Home.css';
import SignIn from './SignIn';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { CardActionArea } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionIcon from '@material-ui/icons/Description';
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
    height: 150,
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
            <Button color="inherit" href="/login">Login</Button>
            {/* <Popup
            trigger={open =><Button color="inherit" >Login</Button>}
            modal
            >
              <SignIn/>
            </Popup> */}
          </Toolbar>
        </AppBar>
      </div>
        <BottomNavigation style={{ backgroundColor: "#263238" }}>
          <BottomNavigationAction label="About" href="/" value="recents" showLabel="true" icon={< InfoIcon  style={{ color: "#006064" }}/>} />
          <BottomNavigationAction label="Contact Us" href="/" showLabel="true" value="favorites" icon={<EmailIcon />} />
          <BottomNavigationAction label="Project Documentation" showLabel="true" href="/" value="nearby" icon={<DescriptionIcon />} />
          <BottomNavigationAction label="Link to Github" href="/" showLabel="true" value="folder" icon={<GitHubIcon />} />
          <BottomNavigationAction label="Course Material" href="/" showLabel="true" value="folder" icon={<FolderIcon />} />
        </BottomNavigation>
    </div>
    
  );
}
export default Home;