import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import cn from "classnames";
import * as actions from "../../store/actions/actions";

import UploadAvatar from "../../components/UsersCreate/UploadAvatar";

import "./UsersCreate.scss";

class UsersCreate extends Component {
  state = {
    avatarUrl: "",
    userName: "",
    userEmail: "",
    userWork: "",
    userAge: "",
    isFormSubmited: false,
    uploadAvatarType: "webUrl",
  };

  onResetFields = () => {
    this.setState({
      avatarUrl: "",
      userName: "",
      userEmail: "",
      userWork: "",
      userAge: "",
    });
  };

  handleFormSubmit = () => {
    const { createNewUser } = this.props;
    const {
      avatarUrl,
      userName,
      userEmail,
      userWork,
      userAge,
      isFormSubmited,
    } = this.state;
    createNewUser({ avatarUrl, userName, userEmail, userWork, userAge });
    this.setState({ isFormSubmited: !isFormSubmited });
  };

  render() {
    const {
      avatarUrl,
      userName,
      userEmail,
      userWork,
      userAge,
      isFormSubmited,
      uploadAvatarType,
    } = this.state;

    const { t } = this.props;

    return (
      <div className="userCreate">
        <div className={cn("formSection", isFormSubmited && "formSubmited")}>
          {isFormSubmited ? (
            <div className="afterSubmit">
              <img src="/img/successV.png" alt="/" />
              <button
                type="button"
                className="createBtn"
                onClick={() => {
                  this.setState({ isFormSubmited: !isFormSubmited });
                  this.onResetFields();
                }}
              >
                {t("createUserMain.addMore_btn")}
              </button>
            </div>
          ) : (
            <>
              <div className="avatarSection">
                <h3>1</h3>
                <div className="avatarContent">
                  <h3>{t("createUserMain.avatarTitle")}</h3>
                  <p>{t("createUserMain.avatarText")}</p>
                  <img src={avatarUrl || "/img/anonymous.png"} alt="/" />

                  <div className="avatarSlider">
                    <div
                      className={cn(
                        "sliderBack",
                        uploadAvatarType === "upload"
                          ? "uploadPosition"
                          : undefined
                      )}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({ uploadAvatarType: "webUrl" })
                      }
                      className={
                        uploadAvatarType === "webUrl"
                          ? "activeSlider"
                          : undefined
                      }
                    >
                      {t("createUserMain.upload_web")}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        this.setState({ uploadAvatarType: "upload" })
                      }
                      className={
                        uploadAvatarType === "upload"
                          ? "activeSlider"
                          : undefined
                      }
                    >
                      {t("createUserMain.upload")}
                    </button>
                  </div>

                  {uploadAvatarType === "webUrl" ? (
                    <div className="urlInput">
                      <p>{t("createUserMain.img_url_lable")}</p>
                      <input
                        value={avatarUrl}
                        type="text"
                        onChange={(e) =>
                          this.setState({ avatarUrl: e.target.value })
                        }
                      />
                    </div>
                  ) : (
                    <UploadAvatar
                      setUserAvatar={(newUrl) =>
                        this.setState({ avatarUrl: newUrl })
                      }
                    />
                  )}
                </div>
              </div>
              <div className="divider" />
              <div className="detailSection">
                <h3>2</h3>
                <div className="detailsContent">
                  <h3>{t("createUserMain.deteilsTitle")}</h3>
                  <div className="inputItem">
                    <p>{t("createUserMain.name_lable")}</p>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) =>
                        this.setState({ userName: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputItem">
                    <p>{t("createUserMain.email_lable")}</p>
                    <input
                      type="text"
                      value={userEmail}
                      onChange={(e) =>
                        this.setState({ userEmail: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputItem">
                    <p>{t("createUserMain.work_lable")}</p>
                    <input
                      type="text"
                      value={userWork}
                      onChange={(e) =>
                        this.setState({ userWork: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputItem">
                    <p>{t("createUserMain.age_lable")}</p>
                    <input
                      type="number"
                      value={userAge}
                      onChange={(e) =>
                        this.setState({ userAge: e.target.value })
                      }
                    />
                  </div>
                  <div className="bottomBtns">
                    <button
                      type="button"
                      className="resetBtn"
                      onClick={() => this.onResetFields()}
                    >
                      {t("createUserMain.rest_btn")}
                    </button>
                    <button
                      type="button"
                      className="createBtn"
                      onClick={() => this.handleFormSubmit()}
                    >
                      {t("createUserMain.create_btn")}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewUser: (userData) =>
      dispatch(actions.createNewUserAction(userData)),
  };
};

UsersCreate.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(
  connect(null, mapDispatchToProps)(UsersCreate)
);
