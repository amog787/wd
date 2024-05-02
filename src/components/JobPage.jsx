import { useEffect, useRef } from "react";
import JobCard from "./JobCard";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../store/features/jobSlice";
import { getFilteredJobs } from "../utils/filterUtils";

export default function JobPage() {
  const data = useSelector((state) => state.jobs.data);
  const fetching = useSelector((state) => state.jobs.fetching);
  const totalJobs = useSelector((state) => state.jobs.totalCount);
  const filters = useSelector((state) => state.filters.filterBy);

  const filtersApplied = Object.values(filters).some((f) => f.length > 0);

  const jobs = filtersApplied ? getFilteredJobs(data, filters) : data;
  const dispatch = useDispatch();

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(getJobs({ limit: filtersApplied ? 500 : 10 }));
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, filtersApplied]);

  useEffect(() => {
    dispatch(getJobs());
  }, []);

  return (
    <>
      <Typography variant="h6">
        Loaded {data.length} out of {totalJobs} Jobs (Filtered:{" "}
        {filtersApplied ? jobs.length : 0})
      </Typography>
      <Grid container spacing={4} pr={{ xs: 3 }}>
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
        <Grid item xs={12} md={6} lg={4} xl={3} height="fit-content">
          <div ref={observerTarget}></div>
        </Grid>
        {fetching && <p>Loading...</p>}
      </Grid>
    </>
  );
}
