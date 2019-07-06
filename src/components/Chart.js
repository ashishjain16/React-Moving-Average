import React from 'react';
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { axisBottom } from 'd3-axis';
import { extent } from 'd3-array';
import { select } from 'd3-selection';

class Chart extends React.Component {

    render() {
        var data = [];
        for (var i in this.props.data) {
            data.push(
                {
                    index: +i,
                    value: +this.props.data[i]
                });
        }

        var width = 400;
        var height = 80;
        var margin = { left: 0, right: 0, bottom: 20, top: 0 };

        return (
            <svg height={height} width={width} ref="node" >
                <g transform="translate(0,0)">
                    <AxisX width={width} height={height} margin={margin} data={data}  />
                    <Line width={width} height={height} margin={margin} data={data} node={this.refs.node} />
                </g>
            </svg>
        );
    }
}

class AxisX extends React.Component {
    render() {
        var data = this.props.data;
        var margin = this.props.margin;var height = this.props.height - margin.top - margin.bottom;
        var width = this.props.width - margin.left - margin.right;

        var x = scaleLinear()
            .range([width,0]);

        var xAxisTicks= data.map(x => x.index);
        
        var xAxis = axisBottom()
            .scale(x).tickValues(xAxisTicks).tickFormat(d => 't-' + d);

        x.domain(extent(data, function (d) { return d.index }));

        select(this.refs.anchor).attr("transform", "translate(0," + height + ")").call(xAxis);

        return (
            <g className="x axis" ref="anchor"></g>);
    }
}

class Line extends React.Component {
    render() {
        var data = this.props.data;
        var margin = this.props.margin;
        var height = this.props.height - margin.top - margin.bottom;
        var width = this.props.width - margin.left - margin.right;

        var x = scaleLinear()
            .range([0, width]);

        var y = scaleLinear()
            .range([height, 0]);

        var line1 = line()
            .x(function (d) { return x(d.index); })
            .y(function (d) { return y(d.value); });

        data.forEach(function (d) {
            x.domain(extent(data, function (d) { return d.index; }));
            y.domain(extent(data, function (d) { return d.value; }));
        });

        var newline = line1(data);
      
        return (
            <path className="line" d={newline}></path>
        );
    }
}

export default Chart;
