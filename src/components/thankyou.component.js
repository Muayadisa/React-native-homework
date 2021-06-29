import React from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Platform} from 'react-native'
import { applyShadow } from '../utils/utils';

const ThankYouComponent = (props) => {
    const continueShopping = () => {
        props.navigation.navigate('Categories');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.thankYouText}>Thank you for your order</Text>
            <TouchableOpacity style={styles.continueShopping} onPress={continueShopping}>
                <Text style={styles.continueShoppingText}>Continue shopping</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    thankYouText: { fontSize: 25},
    container: { backgroundColor: 'white', padding: 30, alignItems: 'center', justifyContent: 'center', flex: 1 },
    continueShopping: { padding: 10, marginTop: 10, borderRadius: 4, backgroundColor: 'rgb(240,240,240)', alignSelf: 'center'},
    continueShoppingText: { fontSize: 18 }
});

export default ThankYouComponent;
