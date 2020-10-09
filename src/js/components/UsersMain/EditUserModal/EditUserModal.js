import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import * as actions from "../../../store/actions/actions";

import "./EditUserModal.scss";

const EditUserModal = () => {
  const dispatch = useDispatch();

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
  const [userBirtDay, setUserBirtDay] = useState(userData.birtDay);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [userWork, setUserWork] = useState(userData.work);

  const handelFormSubmit = (event) => {
    event.preventDefault();
    const userUpdatedData = {
      id: userData._id,
      userImg,
      userName,
      userAge,
      userBirtDay,
      userEmail,
      userWork,
    };

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
              <img src={userImg} alt={userName} />
            </div>
          </div>
          <div className="divider" />
          <div className="formSection">
            <form>
              <div className="formItem">
                <p>Contact Name</p>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
              <div className="formItem">
                <p>Email</p>
                <input
                  type="text"
                  name="userEmail"
                  value={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                />
              </div>
              <div className="formItem">
                <p>Place of Work</p>
                <input
                  type="text"
                  name="userWork"
                  value={userWork}
                  onChange={(event) => setUserWork(event.target.value)}
                />
              </div>
              <div className="formItem">
                <p>BirtDay</p>
                <input
                  type="text"
                  name="userBirtDay"
                  value={userBirtDay}
                  onChange={(event) => setUserBirtDay(event.target.value)}
                />
              </div>
              <div className="formItem">
                <p>Age</p>
                <input
                  type="number"
                  name="userAge"
                  value={userAge}
                  onChange={(event) => setUserAge(event.target.value)}
                />
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
              {!isDeleteOpen ? "Delete" : "Keep"}
            </button>
            {isDeleteOpen && (
              <>
                <p>Are you sure you want to delete this user?</p>
                <button
                  type="button"
                  className="delteSureBtn"
                  onClick={() => {
                    dispatch(actions.deleteUserAction(userData._id));
                    dispatch(actions.openEditUserAction());
                  }}
                >
                  Yes
                </button>
              </>
            )}
          </div>
          <button
            type="submit"
            className="updateBtn"
            onClick={(e) => handelFormSubmit(e)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
