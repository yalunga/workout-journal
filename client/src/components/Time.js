import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './css/data.css';


class Time extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.data);
    return (
      <Paper className="timeContainer">
        <Typography variant="body2">Workout Time</Typography>
        <VictoryChart
          containerComponent={<VictoryContainer className="scrollable"/>}
          domainPadding={20}
          padding={{top: 10, bottom: 10, left: 100, right: 60}}
          theme={VictoryTheme.material}
        >
        <VictoryAxis
          tickFormat={[]}
         />
        <VictoryAxis
          dependentAxis
          crossAxis
           // tickValues specifies both the number of ticks and where
           // they are placed on the axis
           tickValues={[-2, -1, 0, 1, 2]}
           tickFormat={["Weak", "Tired", "Average", "Strong", "Fit"]}
         />
          <VictoryBar
            data={this.props.data}
            sortKey="hour"
            x="hour"
            y="average"
            labels={(d) => `${d.hour}`}
          />
        </VictoryChart>
      </Paper>
    );
  }

}

export default Time;
