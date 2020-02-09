import { combineReducers } from "redux";
import { mapReducer } from "./MapReducer";
import { gameStatsReducer } from "./GameStatsReducer";

const rootReducer = combineReducers({
  gameStats: gameStatsReducer,
  map: mapReducer
});

export default rootReducer;
