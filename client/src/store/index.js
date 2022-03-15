import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer/index";
import thunk from 'redux-thunk'

const enhencers = [applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]

const store = createStore(
  rootReducer,
  compose(...enhencers)
);

export default store;
