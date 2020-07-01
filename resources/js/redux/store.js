import { createBrowserHistory } from "history";
import configureStore from "./configureStore";

const initialState = {};
const history = createBrowserHistory();
const store = configureStore(initialState);
export { history, store };
