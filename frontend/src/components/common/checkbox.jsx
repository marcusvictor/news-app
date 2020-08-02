import React from "react";

const Checkbox = ({ id, label, ...rest }) => {
  return (
    <div className="form-check mb-1">
      <input className="form-check-input" type="checkbox" id={id} {...rest} />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
