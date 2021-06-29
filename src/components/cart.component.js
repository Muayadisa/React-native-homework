import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Platform, ToastAndroid} from 'react-native'
import {connect} from 'react-redux';
import LoadingComponent from "./loading.component";
import { applyShadow } from '../utils/utils';
import {get} from 'lodash';

const couponCodes = {
    "Banana": 5,
    "Food2021": 1,
    "ReactNative": 9
}

const CartComponent = (props) => {
    const [productsInCart, setProductsInCart] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [appliedCouponCode, setAppliedCouponCode] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const renderCategory = ({item, index}) => {
        return (
            <View key={`category-${index}`}
                style={styles.listItem}>
                <View style={styles.productImageWrapper}>
                    <Image source={{uri: item.img}} style={styles.productImage}/>
                </View>

                <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}$</Text>
                </View>
            </View>
        )};

    useEffect(() => {
        getTotalAmount();
        getProductsInCart();
    }, []);

    const getProductsInCart = () => {
        let newProducts = [];
        get(props, 'productsCart', []).forEach((productInCart) => {
            get(props, 'products', []).forEach((category) => {
                if( category.id === productInCart.categoryId ) {
                    newProducts.push(category.products[productInCart.productId])
                }
            })
        })
        setProductsInCart(newProducts);
    }

    const getTotalAmount = () => {
        let amount = 0;
        console.log(props.productsCart)
        get(props, 'productsCart', []).forEach((productInCart) => {
            get(props, 'products', []).forEach((category) => {
                if( category.id === productInCart.categoryId ) {
                    amount += category.products[productInCart.productId].price
                }
            })
        })
        setTotalAmount(amount);
    }

    const checkCouponCode = () => {
        if( appliedCouponCode ) {
            return;
        }
        if( Object.keys(couponCodes).includes(couponCode) ) {
            setTotalAmount(a => ( a - a * ( couponCodes[couponCode] / 100 )));
            ToastAndroid.show(`Coupon code applied successfully, got ${couponCodes[couponCode]}% off`, 1500)
            setAppliedCouponCode(true);
        } else {
            ToastAndroid.show(`Wrong coupon code`, 1500)
        }
    }

    const goToCheckout = () => {
        props.navigation.navigate('CheckoutComponent', {couponCode: couponCodes[couponCode]})
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/header.jpeg')} style={styles.headerImage} />
                <View style={styles.overlayBlack} />
                <View style={styles.overlayView}>
                    <Text style={styles.titleInOverlay}>Products in cart</Text>
                </View>
            </View>
            <FlatList 
                data={productsInCart}
                style={styles.list}
                renderItem={renderCategory}
                keyExtractor={(item, index) => index}
            />
            <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
                <TextInput value={couponCode} onChangeText={text => setCouponCode(text)} placeholderTextColor="grey" style={{color: 'black', flex: 1}} placeholder="Coupon code" />
                <Button onPress={checkCouponCode} title="Check coupon code" />
            </View>
            <Text style={styles.productDetails}>Total amount: {totalAmount}$</Text>
            <Button onPress={goToCheckout} title="Go to checkout" />

        </View>
    )
}

const styles = StyleSheet.create({
    titleInOverlay: {color: 'white', textAlign: 'center', letterSpacing: 1, fontFamily: 'Merienda-Bold'},
    subTitleInOverlay: {color: 'white', width: 200, textAlign: 'center', marginTop: 5, fontSize: 12, color: 'rgb(220,220,220)', fontFamily: 'Merienda'},
    overlayView: { position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'},
    header: { position: 'relative', marginBottom: 15 },
    overlayBlack: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.55)'},
    headerImage: { width: '100%', height: 120 },
    container: { backgroundColor: 'white', flex: 1 },
    list: {marginBottom: 50,},
    listItem: { flex: 1, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 5, flexDirection: 'row', margin: 5},
    productImage: {height: 75, width: 75, borderRadius: 4},
    productImageWrapper: {  
        ...applyShadow,
        marginLeft: 15,
        width: 75, 
        height: 75,
        borderRadius: 4,
    },
    productDetails: {margin: 10},
    title: { textAlign: 'center', fontFamily: 'Merienda-Bold' },
    price: { textAlign: 'center', fontFamily: 'Merienda', color: 'rgb(90,90,90)' },
    subTitle: { marginTop: 4, color: "#999", fontFamily: 'Merienda-Regular', textAlign: 'justify', fontSize: 11 }
});

const mapStateToProps = (state) => ({
    productsCart: state.product.cartData,
    products: state.catalog.data,
});

export default connect(mapStateToProps)(CartComponent)
