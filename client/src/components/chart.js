import React, { Component } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      redirect: false
    }
  }

  getInitialState = () => {
    return {
      activeIndex: 0,
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  }

  handleClick = () => {
    let _this = this;
    axios.post('/deletePoll', {
      _id: this.props._id
    }).then(function(res) {
      _this.setState({
        redirect: true
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';

      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={25}>{payload.option}</text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Votes: ${value}`}</text>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      );
    };

    return (
      <div>
        <PieChart width={800} height={400}>
          <Pie 
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape} 
            data={this.props.data} 
            cx={300} 
            cy={200} 
            innerRadius={90}
            outerRadius={120} 
            fill="#8884d8"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
        {this.props.username === this.props.pollUser && <Button bsStyle="danger" block onClick={this.handleClick}>Remove this Poll</Button>}
      </div>
    );
  }
}

export default Chart;
