import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/actions";

import "./EditUserModal.scss";

const EditUserModal = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.usersReducer.selectedUserData);

  const [userImg, setUserImg] = useState(userData.img);
  const [userName, setUserName] = useState(userData.name);
  const [userAge, setUserAge] = useState(userData.age);
  const [userBirtDay, setUserBirtDay] = useState(userData.birtDay);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [userWork, setUserWork] = useState(userData.work);

  console.log(userData);

  return (
    <div className="editUserModalContainer">
      <div className="editUserModalContent">
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
            <h1>form</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
