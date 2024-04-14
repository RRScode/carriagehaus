'use client'
import React, {useState} from 'react'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';


const NewCar = ({cars, setCars, setAddNewCar, newCarError, setNewCarError}) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    

    const newCarData = {
        make,
        model,
        year,
        color,
    }

    const makeFirstChar = make.charAt(0);
        const makeFirstCharCapped = makeFirstChar.toUpperCase();
        const makeRestOfChars = make.slice(1);
        newCarData.make = `${makeFirstCharCapped}${makeRestOfChars}`;
        
        const modelFirstChar = model.charAt(0);
        const modelFirstCharCapped = modelFirstChar.toUpperCase();
        const modelRestOfChars = model.slice(1);
        newCarData.model = `${modelFirstCharCapped}${modelRestOfChars}`;

        const colorFirstChar = color.charAt(0);
        const colorFirstCharCapped = colorFirstChar.toUpperCase();
        const colorRestOfChars = color.slice(1);
        newCarData.color = `${colorFirstCharCapped}${colorRestOfChars}`;

   
    const handleSave = () => {
        if (make == "" || model == "" || year == "" || color == ""){
           setNewCarError(true);
        } else {
            
            axios
                .post('https://rsproject01-car-data.vercel.app/cars', newCarData)
                .then((response) => {
                    setCars([response.data, ...cars])
                    setAddNewCar(false)
                })
                .catch((error) => console.log(error))
        }
    }
    
   
        return (
            <TableRow>
                <TableCell>
                    <input 
                    type="text"
                    placeholder="Make"
                    value={make}
                    onChange={(e) => {setMake(e.target.value)}}
                    ></input>
                </TableCell>
                <TableCell align="center">
                    <input
                    type="text" 
                    placeholder="Model"
                    value={model}
                    onChange={(e) => {setModel(e.target.value)}}
                    ></input>                    
                </TableCell>
                <TableCell align="center">
                    <input 
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => {setYear(e.target.value)}}
                    ></input>
                </TableCell>
                <TableCell align="center">
                    <input 
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => {setColor(e.target.value)}}
                    ></input>
                </TableCell>
                <TableCell></TableCell>
                <TableCell size="small" align="right">
                    <CancelTwoToneIcon onClick={() => {setAddNewCar(false)}}></CancelTwoToneIcon>
                    <SaveTwoToneIcon onClick={() => {handleSave()}}></SaveTwoToneIcon>
                </TableCell>
            </TableRow>
        )   
    }


export default NewCar