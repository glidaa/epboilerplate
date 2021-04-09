import React, { Component } from 'react';
import * as d3 from 'd3';
const margin = { top: 20, right: 5, bottom: 20, left: 35 };
const height = 300;

class BarChart extends Component {
  state = {
    bars: []
  };

  xAxis = d3.axisBottom().tickFormat(d3.timeFormat('%b'));
  yAxis = d3.axisLeft().tickFormat((d) => `${d}`);

  // xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%b"));
  // yAxis = d3.axisLeft().tickFormat(d => `${d}`);
  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  createChart() {
    const { data, width } = this.props;

    const xScale = d3
      .scaleTime()
      .domain([new Date('01/01/2017'), new Date('08/31/2017')])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    this.xAxis.scale(xScale);
    d3.select(this.refs.xAxis)
      .transition()
      .call(this.xAxis)
      .attr('class', 'axisRed');
    this.yAxis.scale(yScale);
    d3.select(this.refs.yAxis)
      .transition()
      .call(this.yAxis)
      .attr('class', 'axisRed');

    const colorExtent = d3.extent(data, (d) => d.avg).reverse();
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRainbow);

    d3.select(this.refs.chart)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('y', (d) => yScale(d.high));

    d3.select(this.refs.chart)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove();

    d3.select(this.refs.chart)
      .selectAll('rect')
      .transition()
      .attr('x', (d) => xScale(d.date))
      .transition()
      .attr('y', (d) => yScale(d.high))
      .attr('height', (d) => yScale(d.low) - yScale(d.high))
      .attr('fill', (d) => colorScale(d.avg))
      .attr('width', 6);
  }

  render() {
    const { width } = this.props;

    return (
      <svg width={width} height={height} ref="chart">
        <g
          ref="xAxis"
          transform={`translate(0, ${height - margin.bottom})`}
          strokeWidth="5px"
        />
        <g
          ref="yAxis"
          transform={`translate(${margin.left}, 0)`}
          strokeWidth="5px"
        />
      </svg>
    );
  }
}

export default BarChart;
