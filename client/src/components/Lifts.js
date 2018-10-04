import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import Navbar from './Navbar';
import LiftGraph from './LiftGraph';
import './css/data.css';


class Lifts extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      strengthData: [],
      weaknessData: [],
      loading: true
    }
  }

  componentDidMount() {
    fetch('/profile/api/data/')
    .then(res => res.json())
    .then(data => this.setState({ data }))
    .then(() => this.setState({loading: false}));
  }

  render() {
    console.log(this.state.data);
    const isLoading = this.state.loading;
    return (
      <div className="container">
        <Navbar />
        {isLoading ? (
          <CircularProgress className="loading" color="secondary" size={50} />
        ) : (
          <div>
            <LiftGraph name="Back Squat" data={this.state.data.backSquat} />
            <LiftGraph name="Front Squat" data={this.state.data.frontSquat} />
            <LiftGraph name="Clean" data={this.state.data.clean} />
            <LiftGraph name="Snatch" data={this.state.data.snatch} />
            <LiftGraph name="Jerk" data={this.state.data.jerk} />
          </div>
        )}

      </div>
    );
  }

}

export default Lifts;
