import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { jobSlice } from "./features/jobSlice";
import { filterSlice } from "./features/filterSlice";

const rootReducer = combineSlices(jobSlice, filterSlice)

export const store = configureStore({
    reducer: rootReducer
})