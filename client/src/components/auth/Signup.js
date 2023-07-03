import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { signup } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

const iconStyle = {
  color: "#ff4c00",
};

const Signup = ({ setAlert, signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    province: "",
    cfc_id: "",
    password: "",
    password2: "",
  });

  const { name, email, province, cfc_id, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) setAlert("Passwords Do not match", "danger");
    else {
      signup({ name, email, province, cfc_id, password });
    }
  };

  if(isAuthenticated){
    return <Navigate to="/dashboard"/>;
  }
  return (
    <Fragment>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Signup</h1>
        <p className="lead">
          <i className="fas fa-user" style={iconStyle}></i> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              autoComplete="name"
              required
            />
          </div>
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
              type="text"
              placeholder="Province"
              name="province"
              value={province}
              onChange={onChange}
              autoComplete="address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="CFC ID"
              name="cfc_id"
              value={cfc_id}
              onChange={onChange}
              autoComplete="off"
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
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
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, signup })(Signup);
