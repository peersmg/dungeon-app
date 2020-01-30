import { createStore } from "redux";
import rootReducer from "./RootReducer";

const dataStore = createStore(rootReducer);

export default dataStore;
