import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/actions";

import "./CreateLinksFolderModal.scss";

const CreateLinksFolderModal = (props) => {
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
          <h3>Create New Folder</h3>
        </div>
        <div className="inputItem">
          <p>Folder's Name</p>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </div>
        <div className="inputItem">
          <p style={{ borderBottomColor: folderColor || null }}>
            Folder's Color
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
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLinksFolderModal;
