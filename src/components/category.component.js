import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux';
import {fetchProducts, searchProduct} from '../redux/actions'
import LoadingComponent from "./loading.component";
import { applyShadow } from '../utils/utils';
import {get} from 'lodash';

const CategoryComponent = (props) => {
    const categoryId = get(props, 'route.params.categoryId');

    const navigateToProduct = (product) => () => {
        props.navigation.navigate('Product', {product, categoryId});
    }

    const renderCategory = ({item, index}) => {
        return (
            <TouchableOpacity key={`category-${index}`}
                style={styles.listItem}
                onPress={navigateToProduct({...item, desc: get(props, `products[${categoryId}].subTitle`)})}>

                <View style={styles.productImageWrapper}>
                    <Image source={{uri: item.img}} style={styles.productImage}/>
                </View>

                <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price}$</Text>
                </View>
            </TouchableOpacity>
        )};

    useEffect(() => {
        props.navigation.setOptions({
            title: get(props, 'route.params.title')
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/header.jpeg')} style={styles.headerImage} />
                <View style={styles.overlayBlack} />
                <View style={styles.overlayView}>
                    <Text style={styles.titleInOverlay}>{get(props, `products[${categoryId}].title`)}</Text>
                    <Text style={styles.subTitleInOverlay}>{get(props, `products[${categoryId}].subTitle`)}</Text>
                </View>
            </View>
            <FlatList data={get(props, `products[${categoryId}].products`)}
                style={styles.list}
                renderItem={renderCategory}
                numColumns={2}
                keyExtractor={(item, index) => index}
            />
            <LoadingComponent isLoading={props.isLoading}/>
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
    listItem: { flex: 1, alignItems: 'center', margin: 5},
    productImage: {height: 150, width: 150, borderRadius: 4},
    productImageWrapper: {  
        ...applyShadow,
        width: 150, 
        height: 150,
        borderRadius: 4,
    },
    productDetails: {margin: 10},
    title: { textAlign: 'center', fontFamily: 'Merienda-Bold' },
    price: { textAlign: 'center', fontFamily: 'Merienda', color: 'rgb(90,90,90)' },
    subTitle: { marginTop: 4, color: "#999", fontFamily: 'Merienda-Regular', textAlign: 'justify', fontSize: 11 }
});


const mapDispatchToProps = (dispatch) => ({
    fetchProducts: (categoryId) => fetchProducts(categoryId, dispatch),
    searchProduct: (text) => searchProduct(text, dispatch)
});

const mapStateToProps = (state) => ({
    products: state.catalog.data,
    isLoading: state.catalog.isLoading,
    page: state.catalog.page
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComponent)
