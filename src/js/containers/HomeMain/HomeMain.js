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
            contentText={
              <p>
                The first json collection is the <span> Users Collection</span>
                . In here the user can find and manipulate a list of users and
                there details.
                <br />
                The Users route contains 4 API's: <br /> <br />
                <span>Get</span>
                <br />
                <span>Update</span>
                <br />
                <span>Create</span>
                <br />
                <span>Delete</span>
              </p>
            }
            showImage={true}
            responseImage={[
              "/img/usersCode/usersCodeGet.png",
              "/img/usersCode/usersCodeUpadte.png",
              "/img/usersCode/usersCodeDelete.png",
              "/img/usersCode/usersCodeCreate.png",
            ]}
          />
        );
        break;
      case "movies":
        component = (
          <ContentComponent
            contentTitle="Movies JSON"
            contentText={
              <p>
                The <span> Movies collection </span> contains the majority of
                the raw unmanipulated data in this placeholder.
                <br />
                In here the user will find data for over 250 TV seris - Title,
                Network, Rating and more... This API will also allow the user to
                work with a Pagination format, Selecting the amount of data to
                recieve on each AJAX. <br />
                <br />
                The Movies route contains 2 API's: <br /> <br />
                <span>Get</span>
                <br />
                <span>Load More</span>
                <br />
              </p>
            }
            showImage={true}
            responseImage={[
              "/img/moviesCode/moviesCodeGet.png",
              "/img/moviesCode/moviesCodeLoadMore.png",
            ]}
          />
        );
        break;
      case "posts":
        component = (
          <ContentComponent
            contentTitle="Posts JSON"
            contentText={
              <p>
                The <span> Posts collection </span> contains the most
                interesting and complex data <span> JSON-PLACHOLDER </span> can
                offer.
                <br />
                Here the user can find Posts and Comments that relate to a
                specific user from the users collection. Meaning that handling
                this collection will ask the user to select a specific person
                from the Users list before making any changes.
                <br />
                The Posts route contains 4 API's: <br /> <br />
                <span>Get</span>
                <br />
                <span>Create </span> - Post
                <br />
                <span>Create </span> - Comment
                <br />
                <span>Delete </span> - Post only by the currect User
              </p>
            }
            showImage={true}
            responseImage={[
              "/img/postsCode/postsCodeGet.png",
              "/img/postsCode/postsCodeCreate.png",
              "/img/postsCode/postsCodeCreatePost.png",
              "/img/postsCode/postsCodeDelete.png",
            ]}
          />
        );
        break;
      default:
        component = (
          <ContentComponent
            contentTitle="Welcome to JSON Placeholder!"
            contentText={
              <p>
                It looks like this days finding good dynamic dummy data is not
                an easy task... <br />
                For that reason I created my own
                <span> JSON-PLACHOLDER!</span> In here the user will find a
                lot of dummy data which he could change to fit his
                own needs! <br /> <br />
                <span>Good Luck!!</span>
              </p>
            }
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
          <button
            type="button"
            onClick={() => this.setState({ contentType: "posts" })}
            className={contentType === "posts" && "activeTab"}
          >
            Posts
          </button>
        </div>
        <div className="contentContainer">{component}</div>
      </div>
    );
  }
}

export default HomeMain;
