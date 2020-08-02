import React from "react";

const TextArea = ({ id, label, rows, disabled, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        <strong>{label}</strong>
      </label>
      <textarea
        disabled={disabled ? "disabled" : ""}
        {...rest}
        id={id}
        className="form-control"
        rows={rows}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
