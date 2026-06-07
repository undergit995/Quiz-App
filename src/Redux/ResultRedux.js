import { createSlice } from "@reduxjs/toolkit";


const resultSlice = createSlice({
    name:'feedback',
    initialState:{
        resultOne:{},
        currentQuiz:[],
        student:[]
    },
    reducers:{
        getResult: (state,action)=>{
            state.resultOne=action.payload
        },
        getCurrentQuiz: (state,action)=>{
            state.currentQuiz=action.payload
        },
        getStu: (state,action)=>{
            state.student=action.payload
        }
    }
})

export const {getResult,getCurrentQuiz,
    getStu
} = resultSlice.actions;
export default resultSlice.reducer;