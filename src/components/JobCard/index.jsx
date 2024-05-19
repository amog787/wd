import { Avatar, capitalize } from "@mui/material";
import "./JobCard.css";
import { useState, memo } from "react";

const getFormattedSalary = (min, max, code) => {
  if (!min) return `${code} ${max} LPA ✅`;
  if (!max) return `${code} ${min} LPA ✅`;
  return `${code} ${min} - ${max} LPA ✅`;
};

function JobCard({ data }) {
  const {
    minExp,
    maxExp,
    jobRole,
    location,
    maxJdSalary,
    minJdSalary,
    salaryCurrencyCode,
    jobDetailsFromCompany,
    jdLink,
    posted = "13 days ago",
    companyName,
    logoUrl,
  } = data;

  const [viewMore, setViewMore] = useState(false);

  return (
    <div className="j-card">
      <div className="j-posting">
        <p>⏳ Posted {posted}</p>
      </div>
      <div className="j-body">
        <div className="j-company">
          <img src={logoUrl} alt={`${companyName} logo`} />

          <div className="j-company-details">
            <h3>{capitalize(companyName)}</h3>
            <h2>{capitalize(jobRole)}</h2>
            <p>{capitalize(location)}</p>
          </div>
        </div>
        <p className="j-pay-range">
          Estimated Salary:{" "}
          {getFormattedSalary(minJdSalary, maxJdSalary, salaryCurrencyCode)}
        </p>
        <p className="j-about-company">About Company:</p>
        <div className="j-details">
          <p className="j-about-us">
            <strong>About us</strong>
          </p>
          <div
            className={`j-mask ${viewMore ? "j-mask-hide" : ""}`}
            onClick={() => setViewMore((b) => !b)}
          >
            <p className="j-about">{jobDetailsFromCompany}</p>
          </div>
          <a
            className="j-view-job"
            href={jdLink}
            style={viewMore ? { position: "static", marginTop: 4 } : {}}
          >
            View job
          </a>
        </div>

        <div className="j-experience">
          <h3>Minimum Experience</h3>
          <h2>
            {minExp} {`${!minExp ? "NA" : minExp < 2 ? "year" : "years"}`}
          </h2>
        </div>
      </div>
      <div className="j-apply">
        <button onClick={() => window.open(jdLink)} className="j-apply-button">
          ⚡ Easy Apply
        </button>
        <button className="j-ref-button">
          <Avatar
            src="https://mui.com/static/images/avatar/1.jpg"
            className="j-ref-avatar"
          />
          <Avatar
            src="https://mui.com/static/images/avatar/2.jpg"
            className="j-ref-avatar"
          />
          Unlock Referrals
        </button>
      </div>
    </div>
  );
}

export default memo(JobCard);
