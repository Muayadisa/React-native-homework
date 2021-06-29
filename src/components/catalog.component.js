import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image, Button, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux';
import {fetchProducts, searchProduct} from '../redux/actions'
import LoadingComponent from "./loading.component";
import {applyShadow} from '../utils/utils';

const CatalogComponent = (props) => {

    const navigateToCategory = (index, title) => () => {
        props.navigation.navigate('Category', {title, categoryId: index});
    }

    const renderCategory = ({item, index}) => {
        return (
            <TouchableOpacity key={`category-${index}`}
                style={styles.listItem}
                onPress={navigateToCategory(index, item.title)}>

                <View style={styles.productImageWrapper}>
                    <Image source={{uri: item.img}} style={styles.productImage}/>
                </View>

                <View style={styles.productDetails}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subTitle}>{item.subTitle}</Text>
                </View>
            </TouchableOpacity>
        )};

    useEffect(() => {
        props.fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/header.jpeg')} style={styles.headerImage} />
                <View style={styles.overlayBlack} />
                <View style={styles.overlayView}>
                    <Text style={styles.titleInOverlay}>Food Ordering App</Text>
                    <Text style={styles.subTitleInOverlay}>Order your desired meals to your location</Text>
                </View>
            </View>
            <FlatList data={props.categories}
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
    searchBar: {backgroundColor: 'white', width: '100%', borderColor: 'gray', borderWidth: 0.5, height: 50},
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
    subTitle: { marginTop: 4, color: "#999", fontFamily: 'Merienda-Regular', textAlign: 'justify', fontSize: 11 }
});


const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => fetchProducts(null, dispatch),
    searchProduct: (text) => searchProduct(text, dispatch)
});

const mapStateToProps = (state) => ({
    categories: state.catalog.data,
    isLoading: state.catalog.isLoading,
    page: state.catalog.page
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogComponent)
