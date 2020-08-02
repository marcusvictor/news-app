import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./input";
import Checkbox from "./checkbox";
import TextArea from "./textArea";

const _joiOptions = {
  abortEarly: false,
  language: {
    any: {
      empty: "é um campo obrigatório"
    },
    string: {
      regex: {
        base:
          ",precisa ter no mínimo 8 caracteres e conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial"
      },
      max: "precisa ter {{limit}} caracteres ou menos"
    }
  }
};

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate() {
    const { error } = Joi.validate(
      this.state.data,
      this.validationSchema,
      _joiOptions
    );
    //console.log(error);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  validateProperty({ id, value }) {
    const obj = { [id]: value };
    const schema = { [id]: this.validationSchema[id] };
    const { error } = Joi.validate(obj, schema, _joiOptions);
    return error ? error.details[0].message : null;
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange({ currentTarget: input }) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.id] = errorMessage;
    else delete errors[input.id];

    const data = { ...this.state.data };
    let value;
    if (input.type === "checkbox") value = input.checked ? 1 : 0;
    else value = input.value; // type = 'text'

    data[input.id] = value;

    this.setState({ data, errors });
  }

  renderButton(label, disabled = false, style = "inline") {
    const classes = "mt-3 btn btn-primary btn-" + style;

    return (
      <button disabled={disabled || this.validate()} className={classes}>
        {label}
      </button>
    );
  }

  renderInput(id, label, type = "text", disabled = false) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        disabled={disabled}
        id={id}
        label={label}
        value={data[id] ? data[id] : ""}
        error={errors[id]}
        onChange={this.handleChange.bind(this)}
      />
    );
  }

  renderTextArea(id, label, rows = "3", disabled = false) {
    const { data, errors } = this.state;

    return (
      <TextArea
        disabled={disabled}
        id={id}
        label={label}
        rows={rows}
        value={data[id] ? data[id] : ""}
        error={errors[id]}
        onChange={this.handleChange.bind(this)}
      />
    );
  }

  renderCheckbox(id, label) {
    const { data } = this.state;
    return (
      <Checkbox
        id={id}
        label={label}
        checked={data[id]}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

export default Form;
