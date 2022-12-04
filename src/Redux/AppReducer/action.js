//Write the ActionCreator functions here
import axios from 'axios'
import * as types from './actionType'

export const getQuizDataRequest = () => {
    return {
        type:types.GET_DATA_REQUEST
    }
}
export const getQuizDataSuccess = (payload) => {
    return {
        type:types.GET_DATA_SUCCESS,payload
    }
}
export const getQuizDataFailure = () => {
    return {
        type:types.GET_DATA_FAILURE
    }
}

export const getScoreSuccess = (payload) => {
    return {
        type:types.SCORES_SUCCESS,payload
    }
}

export const gettingTheScore = (payload) => (dispatch)=> {
    dispatch(getScoreSuccess(payload))

    console.log("PAYLOAD",payload)
}



export const gettingTheQuizData = (payload) => (dispatch)=> {



const {categories,country,difficulty} = payload
    dispatch(getQuizDataRequest())

    axios.get(`https://the-trivia-api.com/api/questions?categories=${categories}&limit=5&region=${country}&difficulty=${difficulty}`)
    .then((r) => {
        // now getting the option in a single array in api so creted random array to get randomize array of option & the correct answer don't came at the same position
        
        const updatedData = r.data;

        updatedData.forEach((e) => {

        var options = [...e.incorrectAnswers,e.correctAnswer]
        var randNum =  Math.floor(Math.random() * 4) + 1;
        let temp = options[randNum-1]

        options[randNum-1] = options[options.length-1]
        options[options.length-1]= temp
        e.options = options

       })

       dispatch(getQuizDataSuccess(updatedData))
    })
    .catch((e) => dispatch(getQuizDataFailure(e)))
}