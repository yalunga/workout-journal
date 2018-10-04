import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import './css/profile.css';


class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      strength: '',
      weakness: '',
      time: '07:30',
      feel: '',
      goal: '',
      didMetcon: "false",
      didStrength: "false",
      didGymastics: "false",
      lift: 'N/A',
      weight: null,
      date: new Date().toLocaleDateString()
    }
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    fetch('/profile/api/user')
    .then(res => res.json())
    .then(user => this.setState({ user }));
  }

  handleChange = name => event => {
   this.setState({
     [name]: event.target.value,
   });
  };

  submitForm() {
    //TO-DO: ADD FORM VALIDATION
      var workout = {
      time: this.state.time,
      feel: this.state.feel,
      didMetcon: this.state.didMetcon,
      didStrength: this.state.didStrength,
      didGymnastics: this.state.didGymastics,
      strength: this.state.strength,
      weakness: this.state.weakness,
      goal: this.state.goal,
      lift: this.state.lift,
      weight: this.state.weight,
      date: this.state.date
    }
     fetch('/profile/add', {
       method: 'post',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify({
         'workout': workout
       })
     });

  }

  render() {
    console.log(this.state.user);
    const url = "/profile/data";
    const pr = this.state.lift;
    let prForm;

    if (pr === 'N/A') {
      prForm = null;
    } else {
      prForm = (
          <TextField
          id="prValue"
          required
          label="Weight (lbs)"
          className="selectField"
          type="number"
          defaultValue="0"
          value={this.state.weight}
          onChange={this.handleChange('weight')}
          helperText="Please select the weight"
          margin="normal"
          variant="outlined"
          />
      );
    }
    return(
      <div>
        <Navbar />
        <Paper className="workoutForm" elevation={10}>
        <Typography variant="title" align="center">
          Add Workout
        </Typography>
          <form>
            <TextField
              id="time"
              required
              label="Time of workout"
              className="selectField"
              type="time"
              value={this.state.time}
              onChange={this.handleChange('time')}
              helperText="Please select an option"
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1800, // 30 min
              }}
            />
            <TextField
              id="feel"
              required
              select
              label="How did you feel?"
              className="selectField"
              value={this.state.feel}
              onChange={this.handleChange('feel')}
              helperText="Please select an option"
              margin="normal"
              variant="outlined"
            >
              {feelings.map(feeling => (
                <MenuItem key={feeling.key} value={feeling.value}>
                  {feeling.value}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
               control={
                 <Checkbox
                   checked={this.state.checkedA}
                   onChange={this.handleChange('didMetcon')}
                   value={true}
                   color="primary"
                 />
               }
               className="checkbox"
               label="Did a conditioning piece today?"
             />
             <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedB}
                    onChange={this.handleChange('didStrength')}
                    value={true}
                    color="primary"
                  />
                }
                className="checkbox"
                label="Did a strength piece today?"
              />
              <FormControlLabel
                 control={
                   <Checkbox
                     checked={this.state.checkedC}
                     onChange={this.handleChange('didGymastics')}
                     value={true}
                     color="primary"
                   />
                 }
                 className="checkbox"
                 label="Did a gymnastics piece today?"
               />
            <TextField
              id="strength"
              required
              select
              label="Strength"
              className="selectField"
              value={this.state.strength}
              onChange={this.handleChange('strength')}
              helperText="What felt like a strength?"
              margin="normal"
              variant="outlined"
            >
              {options.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="weakness"
              required
              select
              label="Weakness"
              className="selectField"
              value={this.state.weakness}
              onChange={this.handleChange('weakness')}
              helperText="What felt like a weakness?"
              margin="normal"
              variant="outlined"
            >
              {options.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="goal"
              required
              select
              label="Goal"
              className="selectField"
              value={this.state.goal}
              onChange={this.handleChange('goal')}
              helperText="Pick one thing you'd like to improve on outside the gym?"
              margin="normal"
              variant="outlined"
            >
              {improvements.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="pr"
              required
              select
              label="1 Rep Max"
              className="selectField"
              value={this.state.lift}
              onChange={this.handleChange('lift')}
              helperText="Did you 1RM today?"
              margin="normal"
              variant="outlined"
            >
              {lifts.map(option => (
                <MenuItem key={option.key} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {prForm}
            <Button
            variant="outlined"
            size="large"
            color="primary"
            className="addButton"
            onClick={this.submitForm}
            href={url}>
              Add
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const options = [
  {
    key: '1',
    value: 'Conditioning'
  },
  {
    key: '2',
    value: 'Gymnastics'
  },
  {
    key: '3',
    value: 'Muscular Strength'
  },
  {
    key: '4',
    value: 'Muscular Endurance'
  },
  {
    key: '5',
    value: 'Mobility'
  },
];

const feelings = [
  {
    key: '1',
    value: 'Fit'
  },
  {
    key: '2',
    value: 'Strong'
  },
  {
    key: '3',
    value: 'Average'
  },
  {
    key: '4',
    value: 'Tired'
  },
  {
    key: '5',
    value: 'Weak'
  }
]

const improvements = [
  {
    key: '1',
    value: 'Nutrition'
  },
  {
    key: '2',
    value: 'Sleep'
  },
  {
    key: '3',
    value: 'Mindset'
  },
]

const lifts = [
  {
    key: '1',
    value: 'Back Squat'
  },
  {
    key: '2',
    value: 'Front Squat'
  },
  {
    key: '3',
    value: 'Clean'
  },
  {
    key: '4',
    value: 'Snatch'
  }, {
    key: '5',
    value: 'Jerk'
  },
  {
    key: '6',
    value: 'N/A'
  }
]

export default Profile;
