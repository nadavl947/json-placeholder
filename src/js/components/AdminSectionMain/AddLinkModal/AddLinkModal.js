import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/actions";
import cn from "classnames";
import axios from "axios";
import { withTranslation } from "react-i18next";

import "./AddLinkModal.scss";

const AddLinkModal = (props) => {
  const addLinkRef = useRef(null);
  const { t } = props;
  const isAddLinkVisible = useSelector(
    (state) => state.mainReducer.isAddLinkVisible
  );
  const folderData = useSelector(
    (state) => state.linksReducer.selectedFolderData
  );

  const [containerType, setContainerType] = useState("urlStep");
  const [isLoading, setIsLoading] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [newName, setNewName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const eventListener = (e) => {
      if (isAddLinkVisible) {
        if (!addLinkRef.current.contains(e.target)) {
          dispatch(actions.openAddLinkModalAction());
        }
      }
    };
    document.addEventListener("mousedown", eventListener);
    return () => {
      document.removeEventListener("mousedown", eventListener);
    };
  }, [isAddLinkVisible, dispatch]);

  const closeModal = () => dispatch(actions.openAddLinkModalAction());

  const handleSubmitClick = async () => {
    if (containerType === "urlStep") {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://blog-mongo-nadav.herokuapp.com/admin/getLinkData",
          { linkUrl: newUrl }
        );
        const { data = {} } = response;
        setNewIcon(data.favicon || "");
        setNewName(data.title || "");
        setIsLoading(false);
        setContainerType("deteilsStep");
      } catch (error) {
        console.log(error);
        setNewIcon("/img/anonymous.png");
        setNewName(newUrl);
        setIsLoading(false);
        setContainerType("deteilsStep");
      }
    } else {
      dispatch(
        actions.addNewLinkAction(
          newName,
          newUrl,
          newIcon,
          folderData._id,
          closeModal
        )
      );
    }
  };

  return (
    <div className="addLinkModalContainer">
      <div className="modelContent" ref={addLinkRef}>
        {containerType === "deteilsStep" && (
          <button
            type="button"
            className={cn(
              "backButton",
              containerType === "deteilsStep" ? "backVisible" : null
            )}
            onClick={() => setContainerType("urlStep")}
          >
            <p>{t("adminSection.add_link_modal_back")}</p>
          </button>
        )}
        <div className="modalTitle">
          <h3>{`Add Link To ${folderData.folderName} Folder`}</h3>
        </div>
        <div
          className={cn(
            "formSection",
            containerType === "deteilsStep" ? "secendStep" : null
          )}
        >
          <div className="inputUrlStep">
            <p>{t("adminSection.add_link_modal_lable")}</p>
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>
          <div className="linksDeteilsStep">
            <div className="deteilsItem">
              <img
                src={newIcon || "/img/anonymous.png"}
                alt="/"
                onError={(e) => (e.target.src = "/img/anonymous.png")}
              />
              <div className="linkTitle">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="submitBtn">
          {isLoading ? (
            <img src="/img/spiner3.gif" alt="/" />
          ) : (
            <button
              type="button"
              onClick={() => handleSubmitClick()}
              disabled={!newUrl}
            >
              {containerType === "urlStep"
                ? t("adminSection.add_link_modal_continue")
                : t("adminSection.add_link_modal_submit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(AddLinkModal);
