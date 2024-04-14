'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        axios
            .get("https://rsproject01-car-data.vercel.app/cars")
            .then((response) => {
                setCars(response.data);
            })
    }, []);
        
    console.log(cars);
    

    return (
    <div>Dashboard</div>
  )
}

export default Dashboard