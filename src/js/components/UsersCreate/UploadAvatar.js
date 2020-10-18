import React, { useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./UploadAvatar.scss";

const UploadAvatar = (props) => {
  const { setUserAvatar } = props;
  const uploadRef = useRef(null);

  const handleAvatarSelected = async (avatarImage) => {
    let formData = new FormData();
    formData.append("avatarImage", avatarImage);

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/upload",
        body: formData,
        data: formData,
        headers: { "Content-Type": "multipart/form-data; " },
      });
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
          Selcet a File
        </button>
      </div>
    </div>
  );
};

UploadAvatar.propTypes = {
  setUserAvatar: PropTypes.func.isRequired,
};
export default UploadAvatar;
