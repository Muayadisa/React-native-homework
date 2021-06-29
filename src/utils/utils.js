import { Platform } from 'react-native';
export const COLORS = {
    LIGHT: '#ffffff',
    DARK: '#24292e'
};

export const applyShadow = Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOffset: { 
            width: 0, 
            height: 2 
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,    
        backgroundColor: 'white',
    },
    android: {
        elevation: 4
    }
});

export const ERRORS = {
    NOT_FOUND : 'Product couldn\'t be found!',
    PRODUCTS_FULL : 'There is no more products!'
}


export const SERVER_ADDRESS = "http://192.168.1.201:3002/products" || "http://10.0.2.2:3002/products";

export const getPageUrl = () => SERVER_ADDRESS;
export const getProductUrl = (productId) => SERVER_ADDRESS+'/'+productId;
