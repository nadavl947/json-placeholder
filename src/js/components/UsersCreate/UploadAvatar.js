import React, { useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withTranslation } from "react-i18next";

import "./UploadAvatar.scss";

const UploadAvatar = (props) => {
  const { setUserAvatar, t } = props;
  const uploadRef = useRef(null);

  const handleAvatarSelected = async (avatarImage) => {
    let formData = new FormData();
    formData.append("image", avatarImage);

    try {
      const response = await axios({
        method: "POST",
        url: "https://blog-mongo-nadav.herokuapp.com/upload",
        body: formData,
        data: formData,
        headers: { "Content-Type": "multipart/form-data; " },
      });
      const { data = {} } = response;
      setUserAvatar(data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="uploadFile">
      <input
        ref={uploadRef}
        type="file"
        id="file"
        onChange={(e) => handleAvatarSelected(e.target.files[0])}
      />
      <div className="uploadBtn">
        <button type="button" onClick={() => uploadRef.current.click()}>
          {t("uploadAvatar.upload_btn")}
        </button>
      </div>
    </div>
  );
};

UploadAvatar.propTypes = {
  setUserAvatar: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
export default withTranslation()(UploadAvatar);
