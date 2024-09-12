import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import rootReducer from "../reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);


// export default store;
export { store, persistor };