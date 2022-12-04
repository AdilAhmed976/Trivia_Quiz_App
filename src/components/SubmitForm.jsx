
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gettingTheQuizData} from '../Redux/AppReducer/action'
import { Box, Button, CircularProgress } from '@mui/material';
import * as data from "./data"
import { Questions } from './Questions';
import { useSearchParams } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useRef } from 'react';




export const SubmitForm = () => {
    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };    

const dispatch = useDispatch()
const quizData = useSelector((store) => store.AppReducer.quizData)
const score  = useSelector((store) => store.AppReducer.score)
const isLoading = useSelector((store) => store.AppReducer.isLoading)

    
const [searchParams, setSearchParams] = useSearchParams();
const initialCategoryParams = searchParams.getAll("category");
const initialRegionParams = searchParams.getAll("country");
const initialDifficultyParams = searchParams.getAll("difficulty");

const [category,setcategory] = useState(initialCategoryParams || [])
const [difficulty,setDifficulty] = useState(initialDifficultyParams|| [])
const [country,setCountry] = useState(initialRegionParams || [])

const carouselRef = useRef(null)



const payload = {
    "categories":category,
    "country":country,
    "difficulty":difficulty
}

const quiz = () => {
    dispatch(gettingTheQuizData(payload))
}
    
const  categorySet = (event, value,index) => {
    let x = data.categories.indexOf(value)
    let final = data.Mycategories[x]
    setcategory(final)
}

const  countrySet = (event, value,index) => {
    let x = data.contry.indexOf(value)
    let final = data.Mycountry[x]
    setCountry(final)
}

const handleSubmit = () => {
    
    quiz()
   
}

const handleClear = () => {
    // if(category||country||difficulty) {
        setSearchParams("")
        setcategory("")
        setDifficulty("")
        setCountry("")
    // }
}
useEffect(() => {
    //if the category changes then reflect it on the URL search as well

    if (category||country||difficulty) {
      setSearchParams({ category: category,country:country,difficulty:difficulty });
    }

}, [category, setSearchParams,country,difficulty]);


useEffect(() => {
// this use effect will run if the params are set & page was reloaded
    if(initialCategoryParams!=undefined||initialRegionParams!=undefined||initialDifficultyParams!=undefined) {
        handleSubmit()
    }

}, [])


return (
    <Box >
        <Box 
        sx={{
            margin:'auto',
            border:'1px solid lightgray',
            width:{xs:"70%",md:"50%",sm:"50%",lg:"50%",xl:"30%"},
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            paddingX:'20px',
            paddingY:'60px',
            gap:'20px',

        }}
        >
            <Autocomplete 
            value={category}
            onChange={(event, value,index) => categorySet(event, value,index)}
            disablePortal
            id="combo-box-demo"
            options={data.categories}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="categories" />}
            />
            <Autocomplete
            value={country}
            onChange={(event, value,index) =>  countrySet(event, value,index)}
            disablePortal
            id="combo-box-demo"
            options={data.contry}
            sx={{ width: "100%"}}
            renderInput={(params) => <TextField {...params} label="Question Region" />}
            />
            <Autocomplete
            value={difficulty}
            onChange={(event, value) => setDifficulty(value) }
            disablePortal
            id="combo-box-demo"
            options={data.difficultyList}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Difficulty" />}
            defaultChecked={true}
            />
            <Button onClick={handleSubmit} sx={{backgroundColor:'black', width:"50%",color:'white'}} >SUBMIT</Button>
            <Button onClick={handleClear} sx={{backgroundColor:'black', width:"50%",color:'white'}} >Clear</Button>
        </Box>

        <Box>
        
            {isLoading ? 
                <Box sx={{ display: 'flex' ,margin:'auto',width: "50%", alignSelf:'center'}}> <CircularProgress  /> </Box> :  
                <Box margin={"20px"} >
                    <Carousel responsive={responsive} ref={carouselRef} arrows={false} draggable={false} >
                    {quizData.map((item,index) => {
                    return <Questions carouselRef={carouselRef} key={item.id} item = {item} index={index} />                                    
            })}
            <Box margin={"20px"} border={"1px solid black"} >
                <Box >{`Your score is : ${score}`}</Box>
            </Box>
                </Carousel> 
                </Box>
            }       
        </Box>      
</Box>
);

}