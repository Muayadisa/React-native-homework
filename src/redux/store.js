import {createStore, combineReducers} from 'redux';
import {catalog, product} from "./reducers";

export const productStore = createStore(combineReducers({
    catalog: catalog,
    product: product
}));
