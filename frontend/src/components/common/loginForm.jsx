import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import Form from "./form";
import { login, getCurrentUser } from "../../services/authService";
import Spinner from "../common/spinner";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    authenticating: false,
    errors: {},
  };

  validationSchema = {
    username: Joi.string().required().label("Login"),
    password: Joi.string().required().label("Senha"),
    /* .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/) */
  };

  handleFormChange = () => {};

  doSubmit = async () => {
    this.setState({ authenticating: true });
    try {
      const { username, password } = this.state.data;
      await login(username, password);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      this.setState({ authenticating: false });

      if (ex.response) {
        if (ex.response.status === 400 || ex.response.status === 401) {
          const errors = { ...this.state.errors };
          errors.username = ex.response.data.what;
          this.setState({ errors });
        } else if (ex.response.data.what) {
          toast.error(ex.response.data.what);
        }
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;

    if (this.state.authenticating)
      return <Spinner color="#002c6f" loading={true} />;

    return (
      <div className="row justify-content-center">
        <div className="col-3">
          <h3 className="mb-4 mt-5">Faça seu login</h3>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Login")}
            {this.renderInput("password", "Senha", "password")}
            {this.renderButton("Entrar", false, "block")}
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
