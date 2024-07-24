
import { configureStore } from "@reduxjs/toolkit";
import { sliceReducer } from "../Slice/slice";

export const store = configureStore({
    reducer:{
        movieReducer:sliceReducer
    }
})