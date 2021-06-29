import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {productStore} from './src/redux/store'
import CatalogComponent from "./src/components/catalog.component";
import CategoryComponent from "./src/components/category.component";
import ProductComponent from "./src/components/product.component";
import ThankYouComponent from "./src/components/thankyou.component";
import {ShoppingCartIcon} from './src/components/shopping-cart-icon';
import {connect} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import checkoutComponent from './src/components/checkout.component';
import CartComponent from './src/components/cart.component';

enableScreens(true);

const StackNavigator = createStackNavigator();
const App = () => {

  return (
      <Provider store={productStore}>
        <ConnectedIntermediateComponent />
      </Provider>
  );

};

const IntermediateComponent = (props) => {

  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <StackNavigator.Screen options={{headerRight: () => ShoppingCartIcon({badge: props.cartData.length})}} name="Categories" component={CatalogComponent}/>
          <StackNavigator.Screen options={{headerRight: () => ShoppingCartIcon({badge: props.cartData.length})}} name="Category" component={CategoryComponent}/>
          <StackNavigator.Screen options={{headerRight: () => ShoppingCartIcon({badge: props.cartData.length})}} name="Product" component={ProductComponent}/>
          <StackNavigator.Screen name="ThankYou" component={ThankYouComponent}/>
          <StackNavigator.Screen name="Cart" component={CartComponent}/>
          <StackNavigator.Screen name="CheckoutComponent" component={checkoutComponent}/>
      </StackNavigator.Navigator>
    </NavigationContainer>
  )
};

const mapStateToProps = (state) => ({
  cartData: state.product.cartData,
});

const ConnectedIntermediateComponent = connect(mapStateToProps)(IntermediateComponent);

export default App;
