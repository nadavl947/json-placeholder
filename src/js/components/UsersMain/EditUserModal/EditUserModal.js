import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import cn from "classnames";
import * as actions from "../../../store/actions/actions";

import "./EditUserModal.scss";

const EditUserModal = (props) => {
  const dispatch = useDispatch();
  const { t } = props;

  const userData = useSelector((state) => state.usersReducer.selectedUserData);
  const isEditUserModalVisible = useSelector(
    (state) => state.mainReducer.isEditUserModalVisible
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const editPopoverRef = useRef(null);

  useEffect(() => {
    const eventListener = (e) => {
      if (isEditUserModalVisible) {
        if (!editPopoverRef.current.contains(e.target)) {
          dispatch(actions.openEditUserAction());
        }
      }
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [isEditUserModalVisible, dispatch]);

  const [userImg, setUserImg] = useState(userData.img);
  const [userName, setUserName] = useState(userData.name);
  const [userAge, setUserAge] = useState(userData.age);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [userWork, setUserWork] = useState(userData.work);
  const [errorsArray, setErrorsArray] = useState([]);

  const handelFormSubmit = (event) => {
    event.preventDefault();
    const userUpdatedData = {
      id: userData._id,
      userImg,
      userName,
      userAge,
      userBirtDay: userData.birtDay,
      userEmail,
      userWork,
    };

    const fieldsArray = [
      { fieldName: "userName", value: userName },
      { fieldName: "userEmail", value: userEmail },
      { fieldName: "userWork", value: userWork },
      { fieldName: "userAge", value: userAge },
    ];

    const errorsArrayCopy = [];
    fieldsArray.forEach((item) => {
      if (item.value === "") {
        errorsArrayCopy.push(item.fieldName);
      }
    });

    if (errorsArrayCopy.length) {
      setErrorsArray([...errorsArrayCopy]);
      return;
    }

    dispatch(actions.updateUserDateAction(userUpdatedData));
    dispatch(actions.openEditUserAction());
  };

  return (
    <div className="editUserModalContainer">
      <div className="editUserModalContent" ref={editPopoverRef}>
        <div className="editModalClose">
          <button
            type="click"
            onClick={() => dispatch(actions.openEditUserAction())}
          >
            X
          </button>
        </div>
        <div className="mainContentSection">
          <div className="avatarSection">
            <div className="avatar">
              <img src={userImg || "/img/anonymous.png"} alt={userName} />
            </div>
          </div>
          <div className="divider" />
          <div className="formSection">
            <form>
              <div className="formItem">
                <p>{t("userEditModal.name_lable")}</p>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
                <h3 className={errorsArray.includes("userName") && "error"}>
                  {t("inputError.input_error")}
                </h3>
              </div>
              <div className="formItem">
                <p>{t("userEditModal.email_lable")}</p>
                <input
                  type="text"
                  name="userEmail"
                  value={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                />
                <h3 className={errorsArray.includes("userEmail") && "error"}>
                  {t("inputError.input_error")}
                </h3>
              </div>
              <div className="formItem">
                <p>{t("userEditModal.work_lable")}</p>
                <input
                  type="text"
                  name="userWork"
                  value={userWork}
                  onChange={(event) => setUserWork(event.target.value)}
                />
                <h3 className={errorsArray.includes("userWork") && "error"}>
                  {t("inputError.input_error")}
                </h3>
              </div>
              <div className="formItem">
                <p>{t("userEditModal.age_lable")}</p>
                <input
                  type="number"
                  name="userAge"
                  value={userAge}
                  onChange={(event) => setUserAge(event.target.value)}
                />
                <h3 className={errorsArray.includes("userAge") && "error"}>
                  {t("inputError.input_error")}
                </h3>
              </div>
            </form>
          </div>
        </div>
        <div className="fotterBtnsSection">
          <div className={cn("deleteBtn", isDeleteOpen && "delteOpen")}>
            <button
              type="button"
              onClick={() => setIsDeleteOpen(!isDeleteOpen)}
              className={!isDeleteOpen ? "redTextBtn" : "blueTextBtn"}
            >
              {!isDeleteOpen
                ? t("userEditModal.delete_btn")
                : t("userEditModal.keep")}
            </button>
            {isDeleteOpen && (
              <>
                <p>{t("userEditModal.delete_text")}</p>
                <button
                  type="button"
                  className="delteSureBtn"
                  onClick={() => {
                    dispatch(actions.deleteUserAction(userData._id));
                    dispatch(actions.openEditUserAction());
                  }}
                >
                  {t("userEditModal.yes")}
                </button>
              </>
            )}
          </div>
          <button
            type="submit"
            className="updateBtn"
            onClick={(e) => handelFormSubmit(e)}
          >
            {t("userEditModal.update_btn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(EditUserModal);
