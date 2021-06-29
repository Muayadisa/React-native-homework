import React, {useEffect, useState} from 'react';
import {ScrollView, Text, Image, View, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {addToCart} from '../redux/actions';
import LoadingComponent from "./loading.component";
import {get} from 'lodash';
import {ShoppingCartIcon} from './shopping-cart-icon';

const ProductComponent = (props) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState({});

    useEffect(() => {
        const product = get(props, 'route.params.product');
        props.navigation.setOptions({title: `${get(product, 'title')}`});
        setTimeout(() => {
            setProduct(product);
        }, 1500);
    }, []);

    const addProductToCart = () => {
        props.addToCart(product.id, get(props, 'route.params.categoryId'));
        ToastAndroid.show('Product added successfully', 1500);
    }

    useEffect(() => {
        if( product ) {
            setLoading(false);
        }
    }, [product])

    return(
        <ScrollView contentContainerStyle={styles.productDetailsView}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: get(product, 'img')}} style={styles.image} resizeMode={'contain'}/>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.productName}>{get(product, 'title')}</Text>
                {product && 
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>Price: ${get(product, 'price')}</Text>
                    </View>}
            </View>
            {product && <Text style={styles.productDesc}>
                <Text style={styles.shippingPrice}>Shipping cost: ${get(product, 'price') * 0.15}, Total: ${get(product, 'price') + get(product, 'price') * 0.15}{'\n'}{'\n'}</Text>
            {get(product, 'desc')}</Text>}
            <View style={styles.loadingWrapper}>
                <LoadingComponent isLoading={loading}/>
            </View>
            {product && <View style={styles.buyButtonWrapper}>
                <TouchableOpacity onPress={addProductToCart} style={styles.buyButton}>
                    <Text style={{color: 'black'}}>Add to cart</Text>
                    <ShoppingCartIcon noCart />
                </TouchableOpacity>
            </View>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    productName: { fontSize: 20, fontWeight : 'bold'},
    buyButton: { borderRadius: 4, padding: 5, backgroundColor: 'rgb(200,200,200)', alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row'},
    buyButtonWrapper: {marginLeft: 30, marginTop: 10},
    imageContainer: { paddingHorizontal: 30, width: '100%' },
    priceContainer: {position: 'absolute',right: 30, },
    price: {color: 'rgb(90,90,90)', textAlign: 'left', },
    shippingPrice: {color: 'rgb(90,90,90)', textAlign: 'right', marginRight: 30, width: '100%'},
    titleContainer: {width: '100%', alignItems: 'center', justifyContent: 'center', margin: 10},
    image: {height: 200, width: '100%',},
    productDesc: { textAlign: 'left', marginLeft: 30},
    loadingWrapper: { justifyContent: 'center', alignItems: 'center'}
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (productId, categoryId) => addToCart(productId, categoryId, dispatch)
});

const mapStateToProps = (state) => ({
    product: state.product.data,
    productInCart: state.product.cartData
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
