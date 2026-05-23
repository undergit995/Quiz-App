import { createSlice } from "@reduxjs/toolkit";


const trainerSlice = createSlice({
    name:'trainer',
    initialState:{
    trainer:[]
},
    reducers:{
        getTrainers: (state,action)=>{
            state.trainer=action.payload
        },
        putTrainers: (state,action)=>{
            state.trainer.map((item)=>{
                return item._id==action.payload.obj.id?{...item,...action.payload}:item
            })
        },
        postTrainers: (state,action)=>{
            state.trainer.push(action.payload)
        },
        deleteTrainers: (state,action)=>{
            state.trainer.filter((i)=>{
                if(i._id==action.payload){
                    return false
                }
                return true
            })
        }
    }
    
})
const studentSlice = createSlice({
    name:'student',
    initialState:{
        student:[]
    },
    reducers:{
        getStudents: (state,action)=>{
            state.student=action.payload
        },
        putStudents: (state,action)=>{
            state.student.map((item)=>{
                return item._id==action.payload.id?{...item,...action.payload}:item
            })
        },
        postStudents: (state,action)=>{
            state.trainer.push(action.payload)
        },
        deleteStudents: (state,action)=>{
            state.student.filter((i)=>{
                return i._id==action.payload.id?false:true
            })
        }
    }
})

export const {getTrainers,putTrainers,postTrainers,deleteTrainers} = trainerSlice.actions
export const {getStudents,putStudents,postStudents,deleteStudents} = studentSlice.actions

export let studentSlices=studentSlice.reducer;
export default trainerSlice.reducer