import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: [],
    minExp: [],
    location: [],
    minSalary: [],
    selected: {
        roles: [],
        minExp: [],
        location: [],
        minSalary: [],
    },
    filterBy: {
        roles: [],
        minExp: [],
        location: [],
        minSalary: [],
    }
}
export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilterOptions: (state, action) => {
            state[action.payload.filterKey] = action.payload.filterOptions
        },
        setSelectedFilter: (state, action) => {
            state.selected[action.payload.filterKey] = action.payload.selectedOptions
            state.filterBy[action.payload.filterKey] = action.payload.selectedOptions.map(({ value }) => value)
        }
    }
})

export const { setFilterOptions, setSelectedFilter } = filterSlice.actions