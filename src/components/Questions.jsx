import React from 'react'
import { Alert, Box, } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react'; 
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux'
import { gettingTheScore } from '../Redux/AppReducer/action';




export const Questions = ({item,index, carouselRef}) => {
    
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const score = useSelector((store) => store.AppReducer.score)

    const [answer,setAnswer] = useState('')
    const [correctAnswer,setCorrectAnswer] = useState(1)
    const [check,setCheck] = useState(false)
    const [disable,setDisable] = useState(false)

useEffect(() => {
},[])

const handleClick = () => {
    setOpen(true);
};
  const handleClose = () => {
    setOpen(false);
};

const  answerSubmit = (e) => {
    const {next} = carouselRef.current

    if (answer) {
        next()
        setDisable(true)
    }
    else {
        handleClick()
    }
    if (e.target.value == answer) {
        setCheck(true)       
        dispatch(gettingTheScore(score+1))
    }
    else {
        setCheck(false)
    } 
}

  return ( <Box  
            key={item.id} 
            sx=
            {{ 
                backgroundColor:`${index%2==0 ? "#69f0ae" : "#b2ff59"}`,
                width: {xs:"80%",md:"80%",sm:"80%",lg:"80%",xl:"80%"},
                margin:'auto',
                paddingX:'20px',
                paddingY:'30px',
                borderRadius:"50px"
            }} 
            >
<Box  width={"100%"} margin={"auto"} >
    <Box  width={"80%"} margin={"auto"} display={"flex"} justifyContent={"center"}  >
        <FormControl sx={{margin:"auto",width:"100%"}} >
            <FormLabel 
                sx={{color:'black',fontFamily:"Roboto Mono",fontSize:'18px', fontWeight:'500'}}  
                id="demo-row-radio-buttons-group-label">

            {`Question ${index+1} : ${item.question}`}
            </FormLabel>
                <RadioGroup width={"100%"} sx={{width:"100%"}}
                     row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    >
                        {item.options.map((element,index)=>{
                            return <Box key={index} sx={{display:'flex',background:"rgb(2,18,39)", color:"white", flexDirection:'column',width:'100%', borderRadius:'60px',marginY:'7px',paddingX:'12px',paddingY:"7px"}}> 
                                <FormControlLabel onClick={(e) => {setAnswer(e.target.value)}} key={index} value={element} control={<Radio sx={{color:"white"}} />} label={element} />
                            </Box>
                        })}
                </RadioGroup>
        </FormControl>
    </Box>
</Box>

<Box sx={{margin:"auto",display:"flex",justifyContent:"center",alignItems:"center"}} >
    <Button margin={"auto"} variant='contained' disabled={disable ? "disable" :''}  value={item.correctAnswer} onClick={(e) => {answerSubmit(e)}} >submit</Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }} >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Please Select an Option !
        </Alert>
      </Snackbar>
</Box>

</Box>
  )
}
