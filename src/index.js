import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import reducers from "./js/store/reducers/reducers";
import Root from "./js/Root";
import i18n from "./i18n";

import "./css/styles.scss";

i18n.on("languageChanged", (lng) => {
  const body = document.getElementsByTagName("body")[0];
  if (lng === "he") body.setAttribute("dir", "rtl");
  else body.setAttribute("dir", "ltr");
});

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, applyMiddleware(thunk));

// global.isMobile = null;
// global.isAndroid = /(Android)/i.test(navigator.userAgent);
// global.isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);

// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
// 	global.isMobile = true;
// }

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <div style={{ backgroundColor: "#0f314a", height: "65px" }} />
          </div>
        }
      >
        <Root />
      </Suspense>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
