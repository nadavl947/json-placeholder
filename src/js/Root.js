import React from "react";
import { withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./containers/Header/Header";

import "./Root.scss";

const MoviesMain = React.lazy(() =>
  import("./containers/MoviesMain/MoviesMain")
);
const UsersMain = React.lazy(() => import("./containers/UsersMain/UsersMain"));
const HomeMain = React.lazy(() => import("./containers/HomeMain/HomeMain"));
const SideMenu = React.lazy(() => import("./containers/SideMenu/SideMenu"));
const EditUserModal = React.lazy(() =>
  import("./components/UsersMain/EditUserModal/EditUserModal")
);
const MovieDetails = React.lazy(() =>
  import("./components/MoviesMain/MovieDetails/MovieDetails")
);

const root = (props) => {
  const { isEditUserVisible, isMovieDetailsVisible } = props;

  return (
    <div>
      {isEditUserVisible && <EditUserModal />}
      {isMovieDetailsVisible && <MovieDetails />}
      <Header />
      <div className="body">
        <div className="switchContainer">
          <SideMenu />
          <div className="mainSwitch">
            <Switch>
              <HomeMain exact path="/" />
              <UsersMain exact path="/UsersMain" />
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
  isMovieDetailsVisible: state.mainReducer.isMovieDetailsModalVisible,
});

export default connect(mapStateToProps, null)(root);
