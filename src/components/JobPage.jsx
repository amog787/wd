import { useCallback } from "react";
import JobCard from "./JobCard";
import { Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../store/features/jobSlice";
import { getFilteredJobs } from "../utils/filterUtils";
import useInView from "../hooks/intersection-observer";

export default function JobPage() {
  const data = useSelector((state) => state.jobs.data);
  const totalJobs = useSelector((state) => state.jobs.totalCount);
  const filters = useSelector((state) => state.filters.filterBy);
  const filtersApplied = useSelector((state) => state.filters.filtersApplied);

  const jobs = filtersApplied ? getFilteredJobs(data, filters) : data;
  const dispatch = useDispatch();

  const handleInfiniteScroll = useCallback(() => {
    dispatch(getJobs({ limit: filtersApplied ? 500 : 10 }));
  }, [filtersApplied]);

  const ref = useInView(handleInfiniteScroll);

  return (
    <>
      <Typography variant="h6">
        Loaded {data.length} out of {totalJobs} Jobs (Filtered:{" "}
        {filtersApplied ? jobs.length : 0})
      </Typography>
      <Grid container spacing={4}>
        {jobs.map((d) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            xl={3}
            key={d.jdUid}
            height="fit-content"
          >
            <JobCard data={d} />
          </Grid>
        ))}
        <Container ref={ref}>
          <Typography variant="body2" textAlign="center">
            {data.length < totalJobs ? "Fetching More Jobs..." : ""}
            {filtersApplied && jobs.length === 0 && "No Jobs Found..."}
          </Typography>
        </Container>
      </Grid>
    </>
  );
}
