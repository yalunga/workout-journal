import React, { Component } from 'react';
import { VictoryPolarAxis, VictoryArea, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './css/data.css';


class Strengths extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
  }

  render() {
    console.log(this.props.data);
    return (
      <Paper className="strengthContainer">
        <Typography variant="body2">Distribution of Strengths</Typography>
        <VictoryChart polar
          containerComponent={<VictoryContainer className="scrollable"/>}
          theme={VictoryTheme.material}
          padding={80}
        >
          <VictoryPolarAxis dependentAxis
          style={{ axis: { stroke: "none" } }}
          tickFormat={() => null}
          />
          <VictoryPolarAxis

          />
          <VictoryArea
          data={this.props.data}
          style={{
            data: { fill: "#c43a31" },
          }}
          />
        </VictoryChart>
      </Paper>
    );
  }

}

export default Strengths;
