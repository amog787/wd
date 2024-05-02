import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setFilterOptions } from "./filterSlice";
import { getFilterOptions } from "../../utils/filterUtils";

const initialState = {
    data: [],
    totalCount: 0,
    fetching: false,
    lastItem: null,
    error: "",
};

const JOBS_URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export const getJobs = createAsyncThunk(
    "getJobs",
    async ({ limit = 10 }, thunkAPI) => {
        const jobs = thunkAPI.getState().jobs.data
        const body = JSON.stringify({
            limit,
            offset: jobs.length === 0 ? 0 : jobs.length + limit,
        });

        const requestOptions = {
            method: "POST",
            headers,
            body,
        };

        const { totalCount = 0, jdList = [] } = await fetch(JOBS_URL, requestOptions).then(res => res.json())
        if (totalCount === 0) return thunkAPI.rejectWithValue("Something went wrong...")
        if (jobs.length === 0) {
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
        const lastItemFromAPI = jdList[jdList.length - 1]?.jdUid
        const lastItemFromState = jobs[jobs.length - 1]?.jdUid
        if (lastItemFromAPI === lastItemFromState) {
            return thunkAPI.rejectWithValue("Duplicate API call")
        }
        const newJobs = [...jobs, ...jdList]
        const options = getFilterOptions(newJobs)
        Object.entries(options).forEach(([filterKey, filterOptions]) => {
            thunkAPI.dispatch(setFilterOptions({
                filterKey,
                filterOptions
            }))
        })
        return thunkAPI.fulfillWithValue({
            totalCount, jobs: newJobs
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
            state.data = action.payload.jobs
            state.fetching = false
        })
        builder.addCase(getJobs.rejected, (state, action) => {
            state.error = action.payload
            state.fetching = false
        })
    }
});

