import React, { Component } from "react";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import Routes from "./routes";
import reducers from "./store/reducers";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = applyMiddleware(thunk, multi, promise)(createStore)(
  persistedReducer,
  composeWithDevTools()
);

const persistor = persistStore(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
