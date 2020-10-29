import React, { useEffect } from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/actions";

import Header from "./containers/Header/Header";
import EditUserModal from "./components/UsersMain/EditUserModal/EditUserModal";
import MovieDetails from "./components/MoviesMain/MovieDetails/MovieDetails";
import SelecteUserModal from "./components/PostsMain/SelecteUserModal/SelecteUserModal";
import CreatePostModal from "./components/PostsMain/CreatePostModal/CreatePostModal";
import CreateLinksFolderModal from "./components/AdminSectionMain/CreateLinksFolderModal/CreateLinksFolderModal";
import AddLinkModal from "./components/AdminSectionMain/AddLinkModal/AddLinkModal";

import "./Root.scss";

const MoviesMain = React.lazy(() =>
  import("./containers/MoviesMain/MoviesMain")
);
const UsersMain = React.lazy(() => import("./containers/UsersMain/UsersMain"));
const UsersCreate = React.lazy(() =>
  import("./containers/UsersCreate/UsersCreate")
);
const HomeMain = React.lazy(() => import("./containers/HomeMain/HomeMain"));
const SideMenu = React.lazy(() => import("./containers/SideMenu/SideMenu"));
const PostsMain = React.lazy(() => import("./containers/PostsMain/PostsMain"));
const LogInMain = React.lazy(() => import("./containers/LogInMain/LogInMain"));
const AdminSectionMain = React.lazy(() =>
  import("./containers/AdminSectionMain/AdminSectionMain")
);

const Root = (props) => {
  const {
    isEditUserVisible,
    isMovieDetailsVisible,
    isSelectUserVisible,
    isCreatePostVisible,
    isAdminLoggedIn,
    isCreateLinksFolderVisible,
    checkIfAdminLogged,
    isAddLinkVisible,
    history,
  } = props;

  useEffect(() => {
    checkIfAdminLogged();
    if (isAdminLoggedIn === false) {
      history.push("/login");
    }
  }, [isAdminLoggedIn, checkIfAdminLogged, history]);

  return (
    <div>
      {isEditUserVisible && <EditUserModal />}
      {isMovieDetailsVisible && <MovieDetails />}
      {isSelectUserVisible && <SelecteUserModal />}
      {isCreatePostVisible && <CreatePostModal />}
      {isCreateLinksFolderVisible && <CreateLinksFolderModal />}
      {isAddLinkVisible && <AddLinkModal />}
      <Header />
      <div className="body">
        <div className="switchContainer">
          {isAdminLoggedIn ? (
            <>
              <SideMenu />
              <div className="mainSwitch">
                <Switch>
                  <HomeMain exact path="/" />
                  <UsersMain exact path="/UsersMain" />
                  <MoviesMain exact path="/MoviesMain" />
                  <UsersCreate exact path="/UsersCreate" />
                  <PostsMain exact path="/PostsMain" />
                  <AdminSectionMain exact path="/Favorites" />
                </Switch>
              </div>
            </>
          ) : (
            <Switch>
              <LogInMain exact path="/login" />
            </Switch>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkIfAdminLogged: () => dispatch(actions.checkIfUserLogged()),
  };
};

const mapStateToProps = (state) => ({
  isEditUserVisible: state.mainReducer.isEditUserModalVisible,
  isMovieDetailsVisible: state.mainReducer.isMovieDetailsModalVisible,
  isSelectUserVisible: state.mainReducer.isSelectUserVisible,
  isCreatePostVisible: state.mainReducer.isCreatePostVisible,
  isCreateLinksFolderVisible: state.mainReducer.isCreateLinksFolderVisible,
  isAddLinkVisible: state.mainReducer.isAddLinkVisible,
  isAdminLoggedIn: state.adminReducer.isAdminLogged,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
