import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setFilterOptions } from "./filterSlice";
import { getFilterOptions } from "../../utils/filterUtils";

const initialState = {
    _jobs: {},
    data: [],
    totalCount: 0,
    fetching: false,
    error: "",
};

const JOBS_URL = import.meta.env.WD_JOBS_ENDPOINT;
const headers = new Headers();
headers.append("Content-Type", "application/json");

export const getJobs = createAsyncThunk(
    "getJobs",
    async ({ limit = 10 }, thunkAPI) => {
        const jobs = thunkAPI.getState().jobs.data
        const totalJobs = thunkAPI.getState().jobs.totalCount || 0
        const offset = jobs.length
        if (totalJobs > 0 && offset >= totalJobs) {
            return thunkAPI.rejectWithValue("No more jobs available")
        }
        const body = JSON.stringify({
            limit,
            offset,
        });

        const requestOptions = {
            method: "POST",
            headers,
            body,
        };

        const { totalCount = 0, jdList = [] } = await fetch(JOBS_URL, requestOptions).then(res => res.json())
        if (totalCount === 0 || !jdList.length) return thunkAPI.rejectWithValue("Something went wrong...")

        const options = getFilterOptions(jdList)
        Object.entries(options).forEach(([filterKey, filterOptions]) => {
            thunkAPI.dispatch(setFilterOptions({
                filterKey,
                filterOptions
            }))
        })
        return thunkAPI.fulfillWithValue({
            totalCount, jobs: jdList
        })
    }
);

export const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getJobs.pending, (state) => {
            state.fetching = true
        })
        builder.addCase(getJobs.fulfilled, (state, action) => {
            state.totalCount = action.payload.totalCount
            action.payload.jobs.forEach(j => {
                if (!state._jobs[j.jdUid]) {
                    state.data.push(j)
                    state._jobs[j.jdUid] = true;
                }
            })
            state.fetching = false
        })
        builder.addCase(getJobs.rejected, (state, action) => {
            state.error = action.payload
            state.fetching = false
        })
    }
});

