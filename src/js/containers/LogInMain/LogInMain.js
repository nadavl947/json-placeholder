import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/actions";
import { withTranslation } from "react-i18next";

import "./LogInMain.scss";

class LogInMain extends Component {
  state = {
    password: "",
    email: "",
  };

  render() {
    const { logIn, history, t } = this.props;
    const { email, password } = this.state;

    return (
      <div className="logInMain">
        <div className="loginContent">
          <div className="formSection">
            <div className="inputItem">
              <p>{t("logIn.email")}</p>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="inputItem">
              <p>{t("logIn.password")}</p>
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
                {t("logIn.continue")}
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

export default withTranslation()(
  withRouter(connect(null, mapDispatchToProps)(LogInMain))
);
