import React, { Component } from "react";
import PropTypes from "prop-types";
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
    uploadAvatarType: "upload",
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
                Add More Users
              </button>
            </div>
          ) : (
            <>
              <div className="avatarSection">
                <h3>1</h3>
                <div className="avatarContent">
                  <h3>Select Avatar</h3>
                  <p>
                    After creating a new user, you could find and edit him in
                    the Users JSON section. Another feature is the create or
                    comment a post by this new user.
                  </p>
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
                      From web
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
                      Upload
                    </button>
                  </div>

                  {uploadAvatarType === "webUrl" ? (
                    <div className="urlInput">
                      <p>Please past an image url</p>
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
                  <h3>Users Details</h3>
                  <div className="inputItem">
                    <p>Contact Name</p>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) =>
                        this.setState({ userName: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputItem">
                    <p>Email</p>
                    <input
                      type="text"
                      value={userEmail}
                      onChange={(e) =>
                        this.setState({ userEmail: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputItem">
                    <p>Place of Work</p>
                    <input
                      type="text"
                      value={userWork}
                      onChange={(e) =>
                        this.setState({ userWork: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputItem">
                    <p>Age</p>
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
                      Reset
                    </button>
                    <button
                      type="button"
                      className="createBtn"
                      onClick={() => this.handleFormSubmit()}
                    >
                      Create
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
};

export default connect(null, mapDispatchToProps)(UsersCreate);
