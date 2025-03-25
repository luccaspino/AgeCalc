import React from "react";
import "./Results.css";

const Results = ({ age }) => {
  return (
    <div className="result">
      <p>
        <span>{age.years || "--"}</span> years
      </p>
      <p>
        <span>{age.months || "--"}</span> months
      </p>
      <p>
        <span>{age.days || "--"}</span> days
      </p>
    </div>
  );
};

export default Results;