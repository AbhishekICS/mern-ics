
  
import { combineReducers } from "redux";
import  AllStudents from "./studentReducer";

const rootReducer = combineReducers({
  student : AllStudents
});

export default rootReducer;