import { configureStore } from "@reduxjs/toolkit";
import trainerSlice, { studentSlices } from "./Redux.js";

export let store = configureStore({
    reducer:{
        trainer:trainerSlice,
        student:studentSlices
    }
})
