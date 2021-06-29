import { ActionTypes } from "./actions";
import { get, toLower } from 'lodash';  

export const catalog = (state = {isLoading: false, allData: [], data: [], page: 0}, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_CATALOG_SUCCESS:
            return {isLoading: false, data: (get(state, 'allData') || []).concat(action.data), allData: action.data, page: state.page+1};

        case ActionTypes.FETCH_CATALOG_LOADING:
            return {...state, isLoading: true};

        case ActionTypes.SET_BADGE:
            return {...state, badge: action.data};

        case ActionTypes.FETCH_CATALOG_FAILED:
            return {...state, isLoading: false};

        // case ActionTypes.PRODUCT_SEARCH:
        //     return {...state, isLoading: state.isLoading,
        //         data: (get(state, 'allData') || []).filter(obj => toLower(get(obj, 'name', '')).includes(toLower(get(action, 'text'))))};

        default:
            return state;
    }
}

export const product = (state = 
    {
        isLoading: false, 
        data: [],
        cartData: [],
        badge: 0
    }, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PRODUCT_SUCCESS:
            return {isLoading: false, data: action.data};
        case ActionTypes.FETCH_PRODUCT_LOADING:
            return {...state, isLoading: true};
        case ActionTypes.FETCH_PRODUCT_FAILED:
            return {...state, isLoading: false};
        case ActionTypes.SET_BADGE:
            return {...state, badge: action.data};
        case ActionTypes.ADD_TO_CART:
            return {...state, cartData: [...state.cartData, action.data]};

        default:
            return state;
    }
}
