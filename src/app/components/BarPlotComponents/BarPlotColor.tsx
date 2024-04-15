'use client'
import React, { useMemo } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

type BarplotProps = {
  width: number;
  height: number;
  BarPlotDataColor: { name: string; value: number }[];
  cars: {
    make: string;
    model: string;
    year: number;
    id: string;
    color: string;
  }[];
};

export const BarPlotColor = ({ width, height, BarPlotDataColor, cars }: BarplotProps) => {

  //___________parse cars data for Bar chart color quantities____________   
    // map through and extract an array of just colors
    const colorArray = cars.map((x) => {
      return x.color
    });

    // sort colors array by alphabet
    const colorsSortedArray = colorArray.sort();

    // create new array with correct format: "color":"x.color" "count":"1"
    const colorDataFormatted = colorsSortedArray.map((x) => {
      let colorDataFormat = {
        color: x,
        count: 1,
      };
      return colorDataFormat 
    });

    // map through and consolidate counts for each color
    const colorCounts = colorDataFormatted.map((x, y, arr) => {
      if(y == 0){
        return x
      } else if (x.color == arr[y - 1].color) {
        x.count = x.count + arr[y - 1].count;
        arr[y - 1].count = 0;
        return x
      } else {
        return x
      }
    });

    const barPlotColors = colorCounts.filter((x) => {
      if (x.count > 0){
        return x
      }
    })
  //________________________________________________   


  // bounds = area inside the graph axis = calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis is for groups since the barplot is horizontal
  const groups = barPlotColors.sort((a, b) => b.count - a.count).map((d) => d.color);
  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }
  ,[groups, boundsHeight]
  // ,[barPlotColors, height,]
  );

  // X axis
  const xScale = useMemo(() => {
    const [min, max] = d3.extent(barPlotColors.map((d) => d.count));
    return d3
      .scaleLinear()
      .domain([0, max || 10])
      .range([0, boundsWidth]);
  }
  ,[barPlotColors, width, boundsWidth]
  // ,[barPlotColors]
  );

  // Build the shapes
  const allShapes = barPlotColors.map((d, i) => {
    const y = yScale(d.color);
    if (y === undefined) {
      return null;
    }

    return (
      <g key={i}>
        <rect
          x={xScale(0)}
          y={yScale(d.color)}
          width={xScale(d.count)}
          height={yScale.bandwidth()}
          opacity={0.7}
          stroke="black"
          fill={`${d.color}`}
          fillOpacity={.75}
          strokeWidth={1}
          rx={1}
        />
        <text
          x={xScale(d.count) - 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor={xScale(d.count) > 90 ? "end" : "start"}
          alignmentBaseline="central"
          fontSize={12}
          opacity={xScale(d.count) > 90 ? 1 : 0} // hide label if bar is not wide enough
        >
          {d.count}
        </text>
        <text
          x={xScale(0) + 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.color}
        </text>
      </g>
    );
  });

  const grid = xScale
    .ticks(5)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line
          x1={xScale(value)}
          x2={xScale(value)}
          y1={0}
          y2={boundsHeight}
          stroke="#808080"
          opacity={0.2}
        />
        <text
          x={xScale(value)}
          y={boundsHeight + 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={9}
          stroke="#808080"
          opacity={0.8}
        >
          {value}
        </text>
      </g>
    ));

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};
