import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import '../App.css';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      left: false,
      user: null
    };
  }

  componentDidMount(){
    fetch('/profile/api/user')
    .then(res => res.json())
    .then(user => this.setState({ user }));
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    console.log(this.state.user);
    const addURL = "/profile/";
    const analysisURL = "/profile/data/";
    const liftsURL = "/profile/lifts/";
    let sideList;
    if(this.state.user == null){
      sideList = (
       <div>
         <List>
          <div className="listHeader"></div>
           <Divider />
           <ListItem button  component="a" href="/">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component="a" href="/signup">
            <ListItemText primary="Signup" />
          </ListItem>
         </List>
       </div>
      );;
    } else {
      sideList = (
       <div>
         <List>
          <div className="listHeader"></div>
           <Divider />
           <ListItem button  component="a" href={addURL}>
            <ListItemText primary="Add Workout" />
          </ListItem>
          <ListItem button component="a" href={analysisURL}>
            <ListItemText primary="Analysis" />
          </ListItem>
          <ListItem button component="a" href={liftsURL}>
            <ListItemText primary="Lifts" />
          </ListItem>
         </List>
       </div>
      );
    }
    return(
      <div>
        <AppBar className="navbar">
          <Toolbar>
            <IconButton className="menuButton" color="primary" aria-label="Menu">
              <MenuIcon onClick={this.toggleDrawer('left', true)}/>
            </IconButton>
            <Typography variant="title" className="nav-header">
              Workout Journal
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} onOpen={this.toggleDrawer('left', true)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default Navbar;
