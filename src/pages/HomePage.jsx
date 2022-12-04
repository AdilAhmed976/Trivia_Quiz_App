import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import { SubmitForm } from '../components/SubmitForm'



export const HomePage = () => {
    

return ( <Box sx={{
      // backgroundColor:"rgb(255,204,0)"
      }}>
      <Navbar/>
      <SubmitForm/>   
</Box>
)
}
