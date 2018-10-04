import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Time from './Time';
import Strength from './Strengths';
import Weakness from './Weakness';
import Training from './Training';
import Navbar from './Navbar';
import './css/data.css';


class Data extends Component {
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
    fetch('/profile/api/data')
    .then(res => res.json())
    .then(data => this.setState({ data }))
    .then(() => {
      Object.entries(this.state.data.strength).map((i) => {
        this.state.strengthData.push({x: i[0], y: 0, y0: i[1]});
      });
      Object.entries(this.state.data.weakness).map((i) => {
        this.state.weaknessData
        .push({x: i[0], y: 0, y0: i[1]});
      });
      this.setState({loading: false});
    });
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
            <Time data={this.state.data.time}/>
            <Strength data={this.state.strengthData} />
            <Weakness data={this.state.weaknessData} />
            <Training data={this.state.data.trainingBalance} />
          </div>
        )}

      </div>
    );
  }

}

export default Data;
