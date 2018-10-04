import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import Typography from '@material-ui/core/Typography';
import Navbar from './Navbar';
import './css/data.css';


class LiftGraph extends Component {
  render() {
    console.log(this.props.data);
    return (
          <Paper className="liftContainer">
            <Typography variant="body2">{this.props.name}</Typography>
            <VictoryChart
              containerComponent={<VictoryContainer className="scrollable"/>}
              theme={VictoryTheme.material}
            >
              <VictoryLine
                data={this.props.data}
                x="date"
                y="weight"
              />
            </VictoryChart>
          </Paper>
    );
  }

}

export default LiftGraph;
