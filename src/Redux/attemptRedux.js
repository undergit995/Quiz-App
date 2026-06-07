import { createSlice } from "@reduxjs/toolkit";


const attemptQuestion = createSlice({
    name:'attemptQ',
    insitialState:{
        prevQuestion:[]
    },
    reducers:{
        postPrev:(state,action)=>{
            state.prevQuestion.push(action.payload)
        },
        deletePrev:(state,action)=>{
            state.prevQuestion=state.prevQuestion.filter((i)=>{
                return i._id==action.payload?false:true
            })
        }    
    }
})

export const {postPrev,deletePrev} = attemptQuestion.actions;

export default attemptQuestion;