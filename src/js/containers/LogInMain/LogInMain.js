import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/actions";

import "./LogInMain.scss";

class LogInMain extends Component {
  state = {
    password: "",
    email: "",
  };

  render() {
    const { logIn, history } = this.props;
    const { email, password } = this.state;

    return (
      <div className="logInMain">
        <div className="loginContent">
          <div className="formSection">
            <div className="inputItem">
              <p>Email</p>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="inputItem">
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="btnsSection">
              <button
                type="submit"
                onClick={() => logIn(email, password, history.push("/"))}
                className="submitBtn"
              >
                Continue
              </button>
            </div>
          </div>
          <div className="imgSection">
            <img src="/img/logIn.jpg" alt="/" />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password) =>
      dispatch(actions.adminLogInAction(email, password)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LogInMain));
