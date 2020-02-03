import { createStore } from "redux";
import rootReducer from "./reducers/RootReducer";

const dataStore = createStore(rootReducer);

export default dataStore;
