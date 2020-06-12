import userReducer from "./user";
import hobbyReducer from "./hobby";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    hobby: hobbyReducer,
    user: userReducer,
})
export default rootReducer;