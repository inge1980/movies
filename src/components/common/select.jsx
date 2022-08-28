import React from "react";
//import Joi from "joi-browser";

// const Input = ({ type, name, label, value, error, onChange }) => {
// value={value}
// onChange={onChange}
// type={type}
// ---- can be simplified with the spread operator:
// const Input = ({ name, label, error, ...rest }) => {
// {...rest}
const Input = ({ name, label, options, error, ...rest }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="{name}">{label}</label>
        <select {...rest} id={name} name={name} className="form-control">
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </React.Fragment>
  );
};

export default Input;
