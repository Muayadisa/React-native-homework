import {ERRORS, getPageUrl, getProductUrl, SERVER_ADDRESS} from "../utils/utils";
import {ToastAndroid} from 'react-native';
import * as data from '../assets/data/products.json';
import {get} from 'lodash';

export const ActionTypes = {
    FETCH_CATALOG_SUCCESS: 'FETCH_CATALOG_SUCCESS',
    FETCH_CATALOG_LOADING: 'FETCH_CATALOG_LOADING',
    FETCH_CATALOG_FAILED: 'FETCH_CATALOG_FAILED',

    SET_BADGE: 'SET_BADGE',
    ADD_TO_CART: 'ADD_TO_CART',

    FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS',
    FETCH_PRODUCT_LOADING: 'FETCH_PRODUCT_LOADING',
    FETCH_PRODUCT_FAILED: 'FETCH_PRODUCT_FAILED',
};

const fetchData = (dispatch, data, actionSuccess, actionLoading, categoryId) => {
    dispatch(fetchDataLoading(actionLoading));
    let modifiedData;
    if( categoryId ) {
        modifiedData = get(data, `default.categories[${categoryId}]`)
    } else {
        modifiedData = get(data, 'default.categories');
    }
    dispatch(fetchDataSuccess(actionSuccess, modifiedData))
}


const fetchDataSuccess = (type, data) => ({
    type: type,
    data: data
});

const fetchDataLoading = (type) => ({
    type : type,
});

const fetchDataFailed = (type) => ({
    type: type,
    isLoading: false
});

const search = (text) => ({
    type: ActionTypes.PRODUCT_SEARCH,
    text: text
});



export const fetchProducts = (categoryId, dispatch) => {
    return fetchData(dispatch, data,
        ActionTypes.FETCH_CATALOG_SUCCESS,
        ActionTypes.FETCH_CATALOG_LOADING,
        categoryId);

}

export const addToCart = (productId, categoryId, dispatch) => {
    return dispatch({
        type: ActionTypes.ADD_TO_CART,
        data: {productId, categoryId}
    })
}
