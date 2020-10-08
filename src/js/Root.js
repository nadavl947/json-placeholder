import React from "react";
import { withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./containers/Header/Header";

import "./Root.scss";

const MoviesMain = React.lazy(() =>
  import("./containers/MoviesMain/MoviesMain")
);
const UsersMain = React.lazy(() => import("./containers/UsersMain/UsersMain"));
const SideMenu = React.lazy(() => import("./containers/SideMenu/SideMenu"));
const EditUserModal = React.lazy(() =>
  import("./components/UsersMain/EditUserModal/EditUserModal")
);

const root = (props) => {
  const { isEditUserVisible } = props;

  return (
    <div>
      {isEditUserVisible && <EditUserModal />}
      <Header />
      <div className="body">
        <div className="switchContainer">
          <SideMenu />
          <div className="mainSwitch">
            <Switch>
              <UsersMain exact path="/" />
              <MoviesMain exact path="/MoviesMain" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isEditUserVisible: state.mainReducer.isEditUserModalVisible,
});

export default connect(mapStateToProps, null)(root);
