import { createSlice } from "@reduxjs/toolkit";


const resultSlice = createSlice({
    name:'feedback',
    initialState:{
        resultOne:{},
        currentQuiz:[],
        student:[],
        answers:[]
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
        },
        getStuAnswers: (state,action)=>{
            state.answers=action.payload
        }
    }
})

export const {getResult,getCurrentQuiz,
    getStu,getStuAnswers
} = resultSlice.actions;
export default resultSlice.reducer;