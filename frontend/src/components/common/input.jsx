import React from "react";

const Input = ({ id, label, disabled, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        <strong>{label}</strong>
      </label>
      <input
        disabled={disabled ? "disabled" : ""}
        {...rest}
        id={id}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
