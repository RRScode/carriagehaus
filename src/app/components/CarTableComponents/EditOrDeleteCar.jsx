import React from 'react'
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import axios from 'axios';


const EditOrDeleteCar = ({  editing, 
                            setEditing, 
                            deleting, 
                            setDeleting, 
                            cars,
                            setCars, 
                            carData, 
                            make,
                            setMake,
                            model,
                            setModel,
                            year,
                            setYear,
                            color,
                            setColor,
                            newCarError,
                            setNewCarError  }) => {    


  const handleSave = () => {
    if (carData.make == "" || carData.model == "" || carData.year == "" || carData.color == ""){
      setNewCarError(true);
    } else {
      
        axios
          .put(`https://rsproject01-car-data.vercel.app/cars/${carData.id}`, carData)
          .then(() => {
            const carsListEditedItem = cars.map((x) => {
              if (x.id === carData.id) {
                return carData
              } else {
                return x
              }
            })
            setCars(carsListEditedItem)
            setEditing(false)
          })
        }
  }

    const handleDelete = () => {
        axios
          .delete(`https://rsproject01-car-data.vercel.app/cars/${carData.id}`)
          .then((response) => {
            const carsListDeletedItem = cars.filter((x) => {
              if (x.id !== carData.id){ 
                return x}
            })
            setCars(carsListDeletedItem)
            setDeleting(false)
          })
          .catch((error) => {console.log(error)})
      } 
    

    return (
      <>
        {editing ?
          <>
            <CancelTwoToneIcon onClick={() => {setEditing(false)}}></CancelTwoToneIcon>
            <SaveTwoToneIcon onClick={() => {handleSave()}}></SaveTwoToneIcon>
          </>
        : deleting ?
          <>
            <CheckTwoToneIcon onClick={() => {handleDelete()}}></CheckTwoToneIcon>
            <CancelTwoToneIcon onClick={() => {setDeleting(false)}}></CancelTwoToneIcon>
          </>
        :
          <>
            <ModeEditOutlineTwoToneIcon onClick={() => {setEditing(true)}}></ModeEditOutlineTwoToneIcon>
            <DeleteTwoToneIcon onClick={() => {setDeleting(true)}}></DeleteTwoToneIcon>
          </>
        }
      </> 
    )
  }


export default EditOrDeleteCar