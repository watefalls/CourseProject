import { combineReducers, configureStore } from "@reduxjs/toolkit";
import comentsReducer from "./comentsSlice";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: usersReducer,
  coments: comentsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
