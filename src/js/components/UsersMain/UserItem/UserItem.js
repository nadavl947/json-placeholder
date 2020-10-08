import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions/actions";

import "./UserItem.scss";

const UserItem = (props) => {
  const { userData } = props;

  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="userItem"
      onClick={() => {
        dispatch(actions.openEditUserAction());
        dispatch(actions.getEditUserData(userData._id));
      }}
    >
      <img src={userData.img} alt={userData.name} />
      <div className="editCover">
        <div className="whiteEditSection">
          <h3>Edit</h3>
        </div>
      </div>
    </button>
  );
};

UserItem.propTypes = {
  userData: PropTypes.shape({
    img: PropTypes.string,
    userData: PropTypes.string,
  }),
};

export default UserItem;
