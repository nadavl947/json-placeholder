import React from "react";
import PropTypes from "prop-types";

import "./ContentComponent.scss";

const ContentComponent = (props) => {
  const {
    contentTitle,
    contentText,
    showImage,
    responseImage,
  } = props;

  return (
    <div className="homeContentContainer">
      <div className="textSection">
        <h3>{contentTitle}</h3>
        <p>{contentText}</p>
      </div>
      <div className="imageSection">
        {showImage ? (
          <div className="showImages">
            <img src={responseImage} alt="/" />
          </div>
        ) : (
          <div className="logo">
            <h3>{`{...}`}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

ContentComponent.propTypes = {
  contentTitle: PropTypes.string.isRequired,
  contentText: PropTypes.string.isRequired,
  responseImage: PropTypes.string.isRequired,
  showImage: PropTypes.bool.isRequired,
};

export default ContentComponent;
