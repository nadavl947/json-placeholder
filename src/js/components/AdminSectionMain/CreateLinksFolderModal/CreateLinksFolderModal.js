import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/actions";
import { withTranslation } from "react-i18next";

import "./CreateLinksFolderModal.scss";

const CreateLinksFolderModal = (props) => {
  const { t } = props;
  const selectUserRef = useRef(null);
  const isCreateLinksFolderVisible = useSelector(
    (state) => state.mainReducer.isCreateLinksFolderVisible
  );
  const colorsList = useSelector(
    (state) => state.linksReducer.folderColorsOptions
  );
  const [newFolderName, setNewFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const eventListener = (e) => {
      if (isCreateLinksFolderVisible) {
        if (!selectUserRef.current.contains(e.target)) {
          dispatch(actions.openCreateFolderModalAction());
        }
      }
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [isCreateLinksFolderVisible, dispatch]);

  const createNewFolder = () => {
    const closeModal = dispatch(actions.openCreateFolderModalAction());
    dispatch(
      actions.createNewFolderAction(newFolderName, folderColor, closeModal)
    );
  };

  return (
    <div className="createLinksFolderModalContainer">
      <div className="modelContent" ref={selectUserRef}>
        <div className="modalTitle">
          <h3>{t("adminSection.add_folder_modal_title")}</h3>
        </div>
        <div className="inputItem">
          <p>{t("adminSection.add_folder_modal_name")}</p>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </div>
        <div className="inputItem">
          <p style={{ borderBottomColor: folderColor || null }}>
          {t("adminSection.add_folder_modal_color")}
          </p>
          <div className="colorsList">
            {colorsList.map((color) => {
              return (
                <button
                  type="button"
                  key={color.id}
                  style={{ backgroundColor: color.color }}
                  onClick={() => setFolderColor(color.color)}
                />
              );
            })}
          </div>
          <div className="submitBtn">
            <button
              type="button"
              onClick={() => createNewFolder()}
              disabled={!newFolderName || !folderColor ? true : false}
            >
              {t("adminSection.add_folder_modal_create")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(CreateLinksFolderModal);
