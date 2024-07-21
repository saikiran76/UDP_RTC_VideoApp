import { combineReducers } from "redux";
import CallStatusReducer from "./CallStatusReducer";
import streamsReducer from "./streamsReducer";

const rootReducer = combineReducers({
    callStatus: CallStatusReducer,
    streams: streamsReducer
})

export default rootReducer;