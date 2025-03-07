import React, { useState, useEffect } from 'react';
import CustomTable from '../../common/CustomTable';
import { headCells } from '../../common/data';
import Box from '@mui/material/Box';
import DrawerHeader from '../../../layouts/dashboard/SideBar';
import axios from "axios";

const PositionFO = () => {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  //console.log(data);
  //console.log(email);

  useEffect(() => {
    if (email) {
      // Fetch data based on the email
      axios.get(`${backendUrl}/positionHoldingApi/positionFandO/${email}`).then((response) => {
        setData(response.data);
       // console.log(response.data);

      }).catch((error) => {
        let err=error.message
        //console.log(err);
        alert(err);
      });
    }
  }, [email]);

  const handleDelete = (id) => {
    axios.delete(`${backendUrl}/positionHoldingApi/positionFandO/${id}`).then((response) => {
      // Reload data after deletion
      axios.get(`${backendUrl}/positionHoldingApi/positionFandO/${email}`).then((response) => {
        setData(response.data);
      }).catch((error) => {
        let err=error.message
            //console.log(err);
            alert(err);
      });
    }).catch((error) => {
      let err=error.message
      //console.log(err);
      alert(err);
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
    <DrawerHeader /> {/* Assuming this component renders your sidebar and header */}
    <Box sx={{ flexGrow: 1, p: 3, mt: '64px' }}>
    <h1 style={{marginBlock:"30px",alignItems:"center"}}>POSITIONS F&O </h1>
    
      <CustomTable headCells={headCells} rows={data} onDelete={handleDelete}/>
      </Box>
    </Box>
  )
}

export default PositionFO