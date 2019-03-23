import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  // przekopoiowalo mi to co bylo w type={type}, name={name}, value ={data[name]}
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
      {/*conditional rendering */}
    </div>
  );
};

export default Input;
