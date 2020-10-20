import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import reducers from "./js/store/reducers/reducers";
import Root from "./js/Root";
import i18n from './i18n';

import "./css/styles.scss";

i18n.on('languageChanged', lng => {
	const body = document.getElementsByTagName('body')[0];
	if (lng === 'he') body.setAttribute('dir', 'rtl');
	else body.setAttribute('dir', 'ltr');
});

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense
        fallback={<div style={{ textAlign: "center", margin: "70px auto" }} />}
      >
        <Root />
      </Suspense>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
