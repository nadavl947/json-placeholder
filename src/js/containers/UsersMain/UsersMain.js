import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/actions/actions";

import UserItem from "../../components/UsersMain/UserItem/UserItem";

import "./UsersMain.scss";

class UsersMain extends Component {
  state = {};

  componentDidMount() {
    const { getAllUser } = this.props;
    getAllUser();
  }

  render() {
    const { usersList } = this.props;

    return (
      <div className="usersMain">
        {!usersList.length ? (
          <div className="spinner">
            <img
              src="/img/spiner2.gif"
              alt="/"
            />
          </div>
        ) : (
          <div className="usersList">
            {usersList.map((user) => {
              return <UserItem userData={user} key={user._id} />;
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersList: state.usersReducer.usersList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => {
      dispatch(actions.getAllUsersAction());
    },
  };
};

UsersMain.propTypes = {
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ).isRequired,
  getAllUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersMain);
