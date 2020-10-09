import React, { Component } from "react";
import cn from "classnames";
import ContentComponent from "../../components/HomeMain/ContentComponent";

import "./HomeMain.scss";

class HomeMain extends Component {
  state = {
    contentType: "about",
  };

  render() {
    const { contentType } = this.state;
    let component;

    switch (contentType) {
      case "users":
        component = (
          <ContentComponent
            contentTitle="Users JSON"
            contentText="It looks like there is an active recruitment agency with the same company number you inserted.
      A request has been sent to approve your joining to: Lior, Ron, Yona and Victoria
      Once approved, we will let you know"
            showImage={true}
            responseImage="/img/code/usersCode2.png"
          />
        );
        break;
      case "movies":
        component = (
          <ContentComponent
            contentTitle="Movies JSON"
            contentText="It looks like there is an active recruitment agency with the same company number you inserted.
      A request has been sent to approve your joining to: Lior, Ron, Yona and Victoria
      Once approved, we will let you know"
            showImage={true}
            responseImage="/img/code/moviesCode.png"
          />
        );
        break;
      default:
        component = (
          <ContentComponent
            contentTitle="Welcome to JSON Placeholder!"
            contentText="It looks like there is an active recruitment agency with the same company number you inserted.
          A request has been sent to approve your joining to: Lior, Ron, Yona and Victoria
          Once approved, we will let you know"
            showImage={false}
            responseImage=""
          />
        );
    }

    return (
      <div className="homeMainContainer">
        <div className="topNavBar">
          <button
            type="button"
            onClick={() => this.setState({ contentType: "about" })}
            className={contentType === "about" && "activeTab"}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => this.setState({ contentType: "users" })}
            className={contentType === "users" && "activeTab"}
          >
            Users
          </button>
          <button
            type="button"
            onClick={() => this.setState({ contentType: "movies" })}
            className={contentType === "movies" && "activeTab"}
          >
            Movies
          </button>
        </div>
        <div className="contentContainer">{component}</div>
      </div>
    );
  }
}

export default HomeMain;
