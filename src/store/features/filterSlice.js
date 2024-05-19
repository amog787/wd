import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: [],
    minExp: [],
    location: [],
    minSalary: [],
    selected: {
        roles: [],
        minExp: null,
        location: [],
        minSalary: null,
    },
    filterBy: {
        roles: [],
        minExp: null,
        location: [],
        minSalary: null,
    },
    filtersApplied: false
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
            if (Array.isArray(action.payload.selectedOptions)) {
                state.filterBy[action.payload.filterKey] = action.payload.selectedOptions.map(({ value }) => value)
            } else {
                state.filterBy[action.payload.filterKey] = action.payload.selectedOptions?.value
            }
            state.filtersApplied = Object.values(state.filterBy).some((f) =>
                Array.isArray(f) ? f.length > 0 : Boolean(f)
            );
        }
    }
})

export const { setFilterOptions, setSelectedFilter } = filterSlice.actions