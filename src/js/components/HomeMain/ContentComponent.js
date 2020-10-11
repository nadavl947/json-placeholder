import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./ContentComponent.scss";

const ContentComponent = (props) => {
  const { contentTitle, contentText, showImage, responseImage } = props;

  return (
    <div className={cn("homeContentContainer", !showImage && "homeContainer")}>
      <div className="textSection">
        <h3>{contentTitle}</h3>
        {contentText}
      </div>
      <div className="imageSection">
        {showImage ? (
          <div className="showImages">
            {responseImage.map((image, i) => {
              return <img src={image} alt="/" key={i} />;
            })}
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
  responseImage: PropTypes.arrayOf(PropTypes.string).isRequired,
  showImage: PropTypes.bool.isRequired,
};

export default ContentComponent;
