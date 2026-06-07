import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const trainerSlice = createSlice({
    name:'trainer',
    initialState:{
    trainer:[],
    questions:[],
    quiz:[],
    quizCode:{}
},
    reducers:{
        getTrainers: (state,action)=>{
            state.trainer=action.payload
        },
        putTrainers: (state,action)=>{
            state.trainer=state.trainer.map((item)=>{
                return item._id==action.payload.id?{...item,...action.payload}:item
            })
        },
        postTrainers: (state,action)=>{
            state.trainer.push(action.payload)
        },
        deleteTrainers: (state,action)=>{
            console.log(action.payload);
            state.trainer=state.trainer.filter((i)=>{
                if(i._id==action.payload){
                    return false
                }
                return true
            })
        },
        getQuestions: (state,action)=>{
            state.questions=action.payload
        },
        putQuestions: (state,action)=>{
            state.questions=state.questions.map((item)=>{
                return item._id==action.payload.id?{...item,...action.payload}:item
            })
        },
        postQuestions: (state,action)=>{
            state.questions.push(action.payload)
        },
        deleteQuestions: (state,action)=>{
            state.questions=state.questions.filter((i)=>{
                return i._id==action.payload?false:true
            })
        },
        getQuizzes: (state,action)=>{
            state.quiz=action.payload
        },
        postQuiz:(state,action)=>{
            state.quiz.push(action.payload)
        },
        updateQuizzes:(state,action)=>{
            state.quiz=state.quiz.map((item)=>{
                return item._id==action.payload._id?{...item,...action.payload}:item
            })
        },
        putQuizzes: (state,action)=>{
            state.quiz=state.quiz.map((item)=>{
                return item._id==action.payload.id?{...item,isPublished:action.payload.isPublished}:item
            })
        },
        deleteQuizzes: (state,action)=>{
            state.quiz=state.quiz.filter((i)=>{
                return i._id==action.payload?false:true
            })
        },
        postQuizCode:(state,action)=>{
            state.quizCode=action.payload
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
            state.student=state.student.map((item)=>{
                return item._id==action.payload.id?{...item,...action.payload}:item
            })
        },
        postStudents: (state,action)=>{
            state.trainer.push(action.payload)
        },
        getStudentMCQ: (state,action)=>{
            state.studentMCQ=action.payload
        },
        deleteStudents: (state,action)=>{
            state.student=state.student.filter((i)=>{
                return i._id==action.payload?false:true
            })
        }
    }
})


createAsyncThunk('trainer/getTrainers',async()=>{
    try {
        await axios.get('http://localhost:5000/trainer/getTrainers',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
        .then((res)=>{
            return res.data
            
        })
        .catch((err)=>{
            console.log(err.message);
        })

    }
    catch(err){
        console.log(err.message);
        
    }
})
const oneSlice = createSlice({
    name:'sliceOnes',
    initialState:{
        trainerOne:[],
        quizOne:[],
        duration:10,
        quizQuestions:[],
        prevQuestion:[]
    },
    reducers:{
        getTrainerOne: (state,action)=>{
            state.tarinerOne=action.payload
        },
        getQuizOne: (state,action)=>{
            state.quizOne=action.payload
        },
        getQuizTest: (state,action)=>{
            state.quizOne=action.payload
        },
        getDuration:(state,action)=>{state.duration = action.payload},
        getQuizQuestions: (state,action)=>{
            state.quizQuestions=action.payload
        },
        postPrev:(state,action)=>{
            state.prevQuestion.unshift(action.payload)
        },
        deletePrev:(state,action)=>{
            state.prevQuestion=state.prevQuestion.filter((i)=>{
                return i._id==action.payload?false:true
            })
        }    
    },
    extraReducers:(builder)=>{
        // builder.addCase(getQuestions.fulfilled,(state,action)=>{
        //     state.questions=action.payload
        // })
        // builder.addCase(getQuestions.rejected,(state,action)=>{
            //     console.log(action.payload);
        // })
        // builder.addCase(getQuestions.pending,(state,action)=>{
        //     console.log(action.payload);
        // })
        
    }
})

export const {getTrainers,putTrainers,postTrainers,deleteTrainers,
    getQuizzes,postQuiz,putQuizzes,deleteQuizzes,updateQuizzes,
    postQuizCode,getQuestions,putQuestions,postQuestions,deleteQuestions} = trainerSlice.actions
export const {getStudents,putStudents,postStudents,deleteStudents,getStudentMCQ} = studentSlice.actions
export const {getQuizOne,getTrainerOne,getDuration,getQuizQuestions,getQuizTest,postPrev,deletePrev} = oneSlice.actions

export let studentSlices=studentSlice.reducer;
export let oneSlices=oneSlice.reducer;
export default trainerSlice.reducer