import React, { Fragment, useState } from "react";
import {Link, Navigate} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import Alert from "../layout/Alert";
const iconStyle = {
  color: "#ff4c00",
};

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if(isAuthenticated){
    return <Navigate to="/dashboard"/>
  }
  return (
    <Fragment>
      <section className="container">
        <Alert/>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" style={iconStyle}></i> Sign Into Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={onChange}
              autoComplete="new-password"
            />
          </div>
          <div className="buttons">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
        <p className="my-1">
          Don't have an account ?<Link to="/signup">Sign Un</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
