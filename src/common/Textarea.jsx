import React from "react";

const Textarea = ({ name, label, error, ...rest }) => {
  // przekopoiowalo mi to co bylo w type={type}, name={name}, value ={data[name]}
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea  {...rest} name={name} id={name}   className="form-control"  rows="10"></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
      {/*conditional rendering */}
    </div>
  );
};

export default Textarea;
