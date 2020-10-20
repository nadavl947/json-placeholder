import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ContentComponent from "../../components/HomeMain/ContentComponent";

import "./HomeMain.scss";

class HomeMain extends Component {
  state = {
    contentType: "about",
  };

  render() {
    const { contentType } = this.state;
    const { t } = this.props;

    const userProps = {
      contentTitle: t("homeMain.users_title"),
      contentText: (
        <p>
          {t("homeMain.users_text_1")}
          <span>{t("homeMain.users_text_2")}</span>
          {t("homeMain.users_text_3")}
          <br />
          {t("homeMain.users_text_4")}
          <br /> <br />
          <span>{t("homeMain.get")}</span>
          <br />
          <span>{t("homeMain.update")}</span>
          <br />
          <span>{t("homeMain.create")}</span>
          <br />
          <span>{t("homeMain.delete")}</span>
        </p>
      ),
      showImage: true,
      responseImage: [
        "/img/usersCode/usersCodeGet.png",
        "/img/usersCode/usersCodeUpadte.png",
        "/img/usersCode/usersCodeDelete.png",
        "/img/usersCode/usersCodeCreate.png",
      ],
    };

    const moviesProps = {
      contentTitle: t("homeMain.movies_title"),
      contentText: (
        <p>
          {t("homeMain.movies_text_1")}
          <span>{t("homeMain.movies_text_2")}</span>
          {t("homeMain.movies_text_3")}
          <br />
          {t("homeMain.movies_text_4")}
          <br />
          <br />
          {t("homeMain.movies_text_5")}
          <br /> <br />
          <span>{t("homeMain.get")}</span>
          <br />
          <span>{t("homeMain.movies_text_6")}</span>
          <br />
        </p>
      ),
      showImage: true,
      responseImage: [
        "/img/moviesCode/moviesCodeGet.png",
        "/img/moviesCode/moviesCodeLoadMore.png",
      ],
    };

    const postsProps = {
      contentTitle: t("homeMain.posts_title"),
      contentText: (
        <p>
          {t("homeMain.posts_text_1")}
          <span>{t("homeMain.posts_text_2")}</span>
          {t("homeMain.posts_text_3")}
          <span>{t("homeMain.posts_text_4")}</span>
          {t("homeMain.posts_text_5")}
          <br />
          {t("homeMain.posts_text_6")}
          <br />
          {t("homeMain.posts_text_7")}
          <br /> <br />
          <span>{t("homeMain.get")}</span>
          <br />
          <span>{t("homeMain.create")}</span> - {t("homeMain.post")}
          <br />
          <span>{t("homeMain.create")}</span> - {t("homeMain.comment")}
          <br />
          <span>{t("homeMain.delete")}</span> - {t("homeMain.posts_text_8")}
        </p>
      ),
      showImage: true,
      responseImage: [
        "/img/postsCode/postsCodeGet.png",
        "/img/postsCode/postsCodeCreate.png",
        "/img/postsCode/postsCodeCreatePost.png",
        "/img/postsCode/postsCodeDelete.png",
      ],
    };

    const homeProps = {
      contentTitle: t("homeMain.about_title"),
      contentText: (
        <p>
          {t("homeMain.about_text_1")}
          <br />
          {t("homeMain.about_text_2")}
          <span>{t("homeMain.about_text_3")}</span>
          {t("homeMain.about_text_4")}
          <br /> <br />
          <span>{t("homeMain.about_text_5")}</span>
        </p>
      ),
      showImage: false,
      responseImage: [],
    };

    return (
      <div className="homeMainContainer">
        <div className="topNavBar">
          <button
            type="button"
            onClick={() => this.setState({ contentType: "about" })}
            className={contentType === "about" && "activeTab"}
          >
            {t("homeMain.about")}
          </button>
          <button
            type="button"
            onClick={() => this.setState({ contentType: "users" })}
            className={contentType === "users" && "activeTab"}
          >
            {t("homeMain.users")}
          </button>
          <button
            type="button"
            onClick={() => this.setState({ contentType: "movies" })}
            className={contentType === "movies" && "activeTab"}
          >
            {t("homeMain.movies")}
          </button>
          <button
            type="button"
            onClick={() => this.setState({ contentType: "posts" })}
            className={contentType === "posts" && "activeTab"}
          >
            {t("homeMain.posts")}
          </button>
        </div>
        <div className="contentContainer">
          {contentType === "about" && <ContentComponent {...homeProps} />}
          {contentType === "users" && <ContentComponent {...userProps} />}
          {contentType === "movies" && <ContentComponent {...moviesProps} />}
          {contentType === "posts" && <ContentComponent {...postsProps} />}
        </div>
      </div>
    );
  }
}

export default withTranslation()(HomeMain);
