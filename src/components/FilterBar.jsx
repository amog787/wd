import { Autocomplete, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilter } from "../store/features/filterSlice";

const minSalaryOptions = new Array(20)
  .fill(null)
  .map((_, i) => ({ label: `${(i + 1) * 5} LPA`, value: (i + 1) * 5 }));
export default function FilterBar() {
  const filters = useSelector((state) => state.filters);
  const roleOptions = filters.roles;
  const minExpOptions = filters.minExp;
  const locationOptions = filters.location;
  const selected = filters.selected;

  const dispatch = useDispatch();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <Autocomplete
          multiple
          size="small"
          fullWidth
          options={roleOptions}
          value={selected.roles}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue) => {
            dispatch(
              setSelectedFilter({
                filterKey: "roles",
                selectedOptions: newValue,
              })
            );
          }}
          renderInput={(params) => <TextField {...params} label="Roles" />}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Autocomplete
          size="small"
          fullWidth
          options={minExpOptions}
          value={selected.minExp}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue) => {
            dispatch(
              setSelectedFilter({
                filterKey: "minExp",
                selectedOptions: newValue,
              })
            );
          }}
          renderInput={(params) => <TextField {...params} label="Experience" />}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Autocomplete
          size="small"
          fullWidth
          options={minSalaryOptions}
          value={selected.minSalary}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue) => {
            dispatch(
              setSelectedFilter({
                filterKey: "minSalary",
                selectedOptions: newValue,
              })
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Minimum Salary" />
          )}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Autocomplete
          multiple
          size="small"
          fullWidth
          options={locationOptions}
          value={selected.location}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(_, newValue) => {
            dispatch(
              setSelectedFilter({
                filterKey: "location",
                selectedOptions: newValue,
              })
            );
          }}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
      </Grid>
    </Grid>
  );
}
