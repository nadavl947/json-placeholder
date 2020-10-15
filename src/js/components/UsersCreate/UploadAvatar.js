import React, { useRef } from "react";
import PropTypes from "prop-types";

import "./UploadAvatar.scss";

const UploadAvatar = (props) => {
  const { setUserAvatar } = props;
  const uploadRef = useRef(null);

  return (
    <div className="uploadFile">
      <input
        ref={uploadRef}
        type="file"
        id="file"
        onChange={(e) => console.log(e.target.files[0])}
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
