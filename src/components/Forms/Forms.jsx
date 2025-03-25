import React from "react";
import "./Forms.css";

const Forms = ({ onDateChange, errors }) => {
  return (
    <div className="inputs-container">
      <div className={`input-group ${errors.day ? "erro" : ""}`}>
        <label htmlFor="day" className="label-text">
          Day
        </label>
        <input
          type="number"
          id="day"
          placeholder="DD"
          onChange={(e) => onDateChange("day", e.target.value)}
          className={errors.day ? "erro" : ""}
        />
        {errors.day && <p className="error-text">{errors.day}</p>}
      </div>

      <div className={`input-group ${errors.month ? "erro" : ""}`}>
        <label htmlFor="month" className="label-text">
          Month
        </label>
        <input
          type="number"
          id="month"
          placeholder="MM"
          onChange={(e) => onDateChange("month", e.target.value)}
          className={errors.month ? "erro" : ""}
        />
        {errors.month && <p className="error-text">{errors.month}</p>}
      </div>

      <div className={`input-group ${errors.year ? "erro" : ""}`}>
        <label htmlFor="year" className="label-text">
          Year
        </label>
        <input
          type="number"
          id="year"
          placeholder="YYYY"
          onChange={(e) => onDateChange("year", e.target.value)}
          className={errors.year ? "erro" : ""}
        />
        {errors.year && <p className="error-text">{errors.year}</p>}
      </div>
    </div>
  );
};

export default Forms;