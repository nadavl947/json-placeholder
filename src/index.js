import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

import reducers from "./js/store/reducers/reducers";
import Root from "./js/Root";

import "./css/styles.scss";

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, applyMiddleware(thunk));

const customHistory = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense
        fallback={<div style={{ textAlign: "center", margin: "70px auto" }} />}
      >
        <Router history={customHistory}>
          <Root />
        </Router>
      </Suspense>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
