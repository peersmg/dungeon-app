import { combineReducers } from "redux";
import { mapReducer } from "./MapReducer";
import { gameStatsReducer } from "./GameStatsReducer";
import { playerStatsReducer } from "./PlayerStatsReducer";

const rootReducer = combineReducers({
  gameStats: gameStatsReducer,
  playerStats: playerStatsReducer,
  map: mapReducer
});

export default rootReducer;
