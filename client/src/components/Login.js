import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Navbar from './Navbar';
import './css/login.css';

class Login extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="loginContainer">
          <Paper elevation={10} className="paperContainer">
            <form action="/login" method="post">
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className="signIn-button"
              >
                Sign in
              </Button>
              <Button
                href="/signup"
                fullWidth
                variant="raised"
                color="primary"
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Login;
