import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Button, Image, TextInput, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux';
import {get} from 'lodash';

const CheckoutComponent = (props) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [details, setDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        address: '',
        cardHolder: '',
        id: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });
    
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
        const couponCode = get(props, 'route.params.couponCode');
        setTotalAmount(amount - amount * couponCode / 100);
    }

    useEffect(() => {
        getTotalAmount();
    }, []);

    const checkDetailsValidation = () => {
        let missingDetail = '';
        let invalidDetail = '';
        let missingIndex = 0;
        let invalidIndex = 0;
        Object.keys(details).forEach((key) => {
            const value = details[key]
            if( !value ) {
                missingDetail += `${missingIndex !== 0 ? ', ': ''}${key}`;
                missingIndex++;
            } else {
                switch(key) {
                    case 'phoneNumber': {
                        if( value.length !== 10 ) {
                            invalidDetail += `${missingIndex !== 0 ? ', ': ''}${key}`;
                            invalidIndex++;
                        }
                        break;
                    }
                    case 'id': {
                        if( value.length !== 9 ) {
                            invalidDetail += `${invalidIndex !== 0 ? ', ': ''}${key}`;
                            invalidIndex++;
                        }
                        break;
                    }
                }
            }
        })
        if( missingDetail ) {
            alert(`Missing ${missingDetail}`)
            return false;
        }
        if( invalidDetail ) {
            alert(`Invalid ${invalidDetail}`)
            return false;
        }
        return true;
    }

    const onChangeText = (type) => (text) => {
        setDetails(currentDetails => ({
            ...currentDetails,
            [type]: text
        }))
    }

    const onPurchase = () => {
        if( checkDetailsValidation() ) {
            props.navigation.navigate('ThankYou');
        }
    }

    const renderInput = (type, index) => {

        return (
            <View style={styles.inputWrapper} key={`type-${type}-${index}`}>
                <Text style={styles.text}>{type}* :</Text>
                <TextInput placeholderTextColor="grey" style={styles.textInput} onChangeText={onChangeText(type)} value={details[type]} placeholder={type} />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!!totalAmount && <Text>Total amount: {totalAmount}$</Text>}
            {Object.keys(details).map((key, index) => (
                renderInput(key, index)
            ))}
            <Button style={styles.buyButton} onPress={onPurchase} title="Purchase" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputWrapper: {flexDirection: 'row', padding: 5, alignItems: 'center'},
    container: { padding: 30},
    textInput: { borderBottomColor: 'black', borderBottomWidth: 1, flex: 1, marginLeft: 15, color: 'black'},
    text: { marginTop: 10},
    buyButton: {backgroundColor: 'red', padding: 15, marginTop: 15},
});

const mapStateToProps = (state) => ({
    productsCart: state.product.cartData,
    products: state.catalog.data,
});

export default connect(mapStateToProps)(CheckoutComponent)
