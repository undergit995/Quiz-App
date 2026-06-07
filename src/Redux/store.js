import { configureStore } from "@reduxjs/toolkit";
import trainerSlice, { studentSlices,  oneSlices } from "./Redux.js";
import attemptQuestion from "./attemptRedux.js";
import resultSlice from "./ResultRedux.js";


export let store = configureStore({
    reducer:{
        trainer:trainerSlice,
        student:studentSlices,
        sliceOnes:oneSlices,
        feedback:resultSlice,
        // attemptQ:attemptQuestion.reducers
    }
})
