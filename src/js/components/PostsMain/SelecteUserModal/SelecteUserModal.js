import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { withTranslation } from "react-i18next";
import * as actions from "../../../store/actions/actions";

import "./SelecteUserModal.scss";

const SelecteUserModal = (props) => {
  const { t } = props;
  const usersList = useSelector((state) => state.usersReducer.usersList);
  const isUserSelectModalOpen = useSelector(
    (state) => state.mainReducer.isSelectUserVisible
  );
  const [userSelectedId, setUserSelectedId] = useState("");
  const dispatch = useDispatch();

  const selectUserRef = useRef(null);

  useEffect(() => {
    const eventListener = (e) => {
      if (isUserSelectModalOpen) {
        if (!selectUserRef.current.contains(e.target)) {
          dispatch(actions.openSelectUserModalAction());
        }
      }
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [isUserSelectModalOpen, dispatch]);

  const handleSelect = () => {
    const userData = usersList.find((user) => user._id === userSelectedId);
    dispatch(actions.selecteCurrentUser(userData));
    dispatch(actions.openSelectUserModalAction());
  };

  return (
    <div className="selectUserContainer">
      <div className="selectUserContent" ref={selectUserRef}>
        <h3>{t("selectUserModal.modalTitle")}</h3>
        <div className="usersList">
          {usersList.map((user) => {
            return (
              <button
                type="button"
                key={user._id}
                className={cn(
                  "userItemBtn",
                  userSelectedId === user._id && "selectedUser"
                )}
                onClick={() => setUserSelectedId(user._id)}
              >
                <img src={user.img || "/img/anonymous.png"} alt={user.name} />
                <h3>{user.name}</h3>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className={cn("selectBtn", userSelectedId && "activeBtn")}
          onClick={() => handleSelect()}
        >
          {t("selectUserModal.select_btn")}
        </button>
      </div>
    </div>
  );
};

export default withTranslation()(SelecteUserModal);
