import { combineReducers } from "redux";
import { mapReducer } from "./MapReducer";
import { gameStatsReducer } from "./StatsReducer";

const rootReducer = combineReducers({
  stats: gameStatsReducer,
  map: mapReducer
});

export default rootReducer;
