import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from "@react-navigation/native";

export const ShoppingCartIcon = (props) => {
    const navigation = useNavigation();

    const navigateToCart = () => {
        if( !props.noCart ) {
            navigation.navigate('Cart');
        }
    }
    return (
        <TouchableOpacity onPress={navigateToCart} style={{ alignItems: 'center', justifyContent: 'center'}}>
            <View style={{position: 'absolute', top: -22,  right: 0, width: 70, height: 70, alignItems:"center",justifyContent:"center", zIndex:2000 }}>
                <Text style={{fontSize:18, fontFamily:"Merienda-Regular"}}>{props.badge}</Text>
            </View>
            <Icon  name="shoppingcart" color="black" size={24} style={{marginRight:10}} />
        </TouchableOpacity>
    )
}