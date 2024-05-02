import { capitalize } from "@mui/material";

const filters = {
    roles: "jobRole",
    minExp: "minExp",
    location: "location",
    minSalary: "minJdSalary",
};

export const getFilterOptions = (list) => {
    const res = {};
    Object.entries(filters).forEach(([fK, fV]) => {
        res[fK] = Array.from(
            list.reduce((acc, o) => {
                if (o[fV] !== null) {
                    acc.add(o[fV]);
                }
                return acc;
            }, new Set())
        ).map((r) => ({ label: capitalize(`${r}`), value: r }));
    });
    return res;
};

export const getFilteredJobs = (jobs, filterOptions) => {
    return jobs
        .filter(({ jobRole }) => {
            if (!filterOptions["roles"].length) return true;
            return filterOptions["roles"].includes(jobRole);
        })
        .filter(({ minExp }) => {
            if (!filterOptions["minExp"].length) return true;
            return (
                minExp >= Math.min(...filterOptions["minExp"])
            );
        })
        .filter(({ location }) => {
            if (!filterOptions["location"].length) return true;
            return filterOptions["location"]
                .includes(location);
        })
        .filter(({ minJdSalary }) => {
            if (!filterOptions["minSalary"].length) return true;
            return (
                minJdSalary >=
                Math.min(...filterOptions["minSalary"])
            );
        });
};
