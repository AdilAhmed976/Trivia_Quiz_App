// NOTE: DO NOT MODIFY the intial state structure in this file.
import * as types from './actionType'

const initialState = {
  quizData: [],
  isLoading: false,
  isError: false,
  score:0
};


const reducer = (state = initialState,{type,payload}) => {
  switch (type) {
    case types.GET_DATA_REQUEST :
    return {
      ...state,
      isLoading: true,
      isError: false,
    }
    case types.GET_DATA_SUCCESS :
    return {
      ...state,
      quizData: payload,
      isLoading: false,
      isError: false,
    }
    case types.GET_DATA_FAILURE :
    return {
      ...state,
      isLoading: false,
      isError: true,
    }

    case types.SCORES_SUCCESS : 
    return {
      ...state,
      score:payload
    }
        
    default:
      return state;
  }
};

export { reducer };
