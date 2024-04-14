'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarsTable from "./CarTableComponents/CarsTable";
// import PieChartMakes from '@/components/PieChartComponents/PieChartMakes';
// import { BarPlotColor } from '@/components/BarPlotComponents/BarPlotColor';
// import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';


const Dashboard = ({loggedIn, setLoggedIn}) => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        axios
            .get("https://rsproject01-car-data.vercel.app/cars")
            .then((response) => {
                const sortMostRecent = response.data.reverse()
                setCars(sortMostRecent);
            })
    }, []);


    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                }}>
                <h1>Carriage Haus</h1>
                {/* <div style={{padding:"15px", display:"flex", alignItems:"center"}} onClick={() => { setLoggedIn(false) }}>
                    <p style={{cursor:"pointer"}}>Log Out </p>
                    <LogoutTwoToneIcon style={{cursor:"pointer", padding:"5px"}}
                        ></LogoutTwoToneIcon>
                </div> */}

            </div>

            {/* <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly"}}>
                <BarPlotColor
                    cars={cars}
                    width={400}
                    height={400}
                />
                
                <PieChartMakes
                    cars={cars} 
                    width={200}
                    height={200}
                    innerRadius={60}
                    outerRadius={100}
                /> 

            </div> */}


            <CarsTable
                cars={cars}
                setCars={setCars}
            />
        </>
    )



}

export default Dashboard