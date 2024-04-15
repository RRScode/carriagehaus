"use client"
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";


export default function PieChartMakes ({cars}) {

//___________parse cars data for Piechart car make quantities______
    /*          FORTMAT:
                    data = {
                        make: "car make" (string),
                        count: "quantity" (number)
                    }
    */ 
    // make a copy of the array but each object should only the car make, no other details.
    const listByMake = cars.map((x) => {
        return x.make
    });
    const sortedListByMake = listByMake.sort();
  
  // make a copy of the array, this time adding a count of 1 to each object
  
    const WIPData = sortedListByMake.map((x) => {
        let makeData = {
        make: x,
        value: 1
        }
        return makeData
    });
  
  /*  now that we have the correct format, make another copy of the array, 
    consolidate the counts for duplicate makes.
    The result should show the total number of cars of the same make, under the first car of that make. 
    Any duplicate makes will have a count of 0.
            example:
                {make: Toyota, value: 3},
                {make: Toyota, value: 0},
                {make: Toyota, value: 0},       */
    const WIPData1 = WIPData.map((x, y, arr) => {
        if (y == 0) {
        return x
        } else if (x.make == arr[y - 1].make) {
        x.value = x.value + arr[y - 1].value;
        arr[y - 1].value = 0;
        return x
        } else {
        return x
        }
    })
  
  /*  Make a new array removing any duplicate makes */
    const data = WIPData1.filter((x) => {
        if (x.value > 0)
        return x
    })

    
//_________________________________________________________________________________________




    
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          startAngle,
          endAngle,
          fill,
          payload,
          percent,
          value
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";
        
      
        return (
          <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
              {payload.make}
            </text>
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
            <path
              d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
              stroke={fill}
              fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            
            <text
              x={ex + (cos >= 0 ? 1 : -1) * 12}
              y={ey}
              textAnchor={textAnchor}
              fill="#333"
            >{`${payload.make}`}</text>
            <text
              x={ex + (cos >= 0 ? 1 : -1) * 12}
              y={ey}
              dy={18}
              textAnchor={textAnchor}
              fill="#333"
            >
              {`(${value})`}
            </text>
          </g>
        );
      };




  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  return (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}




