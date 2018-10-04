import React, { Component } from 'react';
import { VictoryPie, VictoryArea, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './css/data.css';


class Training extends Component {
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
      <Paper className="trainingContainer">
        <Typography variant="body2">Distribution of Training</Typography>
          <VictoryPie
            containerComponent={<VictoryContainer className="scrollable"/>}
            data={this.props.data}
            theme={VictoryTheme.material}
            padding={100}
          />
      </Paper>
    );
  }

}

export default Training;
