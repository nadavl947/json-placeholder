import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions/actions";

import "./UserItem.scss";

const UserItem = (props) => {
  const { userData } = props;

  const dispatch = useDispatch();

  return (
    <div className="userItem">
      <img src={userData.img || "/img/anonymous.png"} alt={userData.name} />
      <div className="editCover">
        <div className="whiteEditSection">
          <button
            className="editBtn"
            type="button"
            onClick={() => {
              dispatch(actions.openEditUserAction());
              dispatch(actions.getEditUserData(userData._id));
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  userData: PropTypes.shape({
    img: PropTypes.string,
    userData: PropTypes.string,
  }),
};

export default UserItem;
