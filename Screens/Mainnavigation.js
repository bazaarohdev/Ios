/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import { StackNavigator } from 'react-navigation';
import Login from './Loginscreen'
import Homescreen from './Homescreen'
import Logintabs from './logintabs'
import signup from './signup'
import profile from './profile'
import help from './help'
import product from './product'
import Adddproduct from './Addproduct'
import searchfilter from './searchfilter'
import editproducr from './editproduct'
import editproduct from './editproduct';

const Main = StackNavigator({
    ScreenOne: {
        screen: Login,
        navigationOptions: () => ({ header: null, }),
    },

    logintabspage: {
        screen: Logintabs,
        navigationOptions: () => ({ header: null, }),
    },

    signuppage: {
        screen: signup,
        navigationOptions: () => ({ header: null, }),
    },
    Homescreenpage: {
        screen: Homescreen,
        navigationOptions: () => ({ header: null, }),
    },
   Profilepage: {
        screen: profile,
        navigationOptions: () => ({
            title: 'My Profile',
            headerStyle: { backgroundColor: '#66CECC' },
            headerTintColor: '#FFF',
        })
    },
    Helppage: {
        screen: help,
        navigationOptions: () => ({
            title: 'Help',
            headerStyle: { backgroundColor: '#66CECC' },
            headerTintColor: '#FFF',
        })
    },
    productpage: {
        screen: product,
        navigationOptions: () => ({ header: null, }),
        // navigationOptions: () => ({
        //     title: 'Product',
        //     headerStyle: { backgroundColor: '#66CECC' },
        //     headerTintColor: '#FFF',
        // })
    },

    editproductpage: {
        screen: editproduct,
        navigationOptions: () => ({
            title: 'Edit Product',
            headerStyle: { backgroundColor: '#FFF' },
            headerTintColor: '#000',
        })
    },
    Addproductpage: {
        screen: Adddproduct,
        navigationOptions: () => ({
            title: 'AddProduct',
            headerStyle: { backgroundColor: '#66CECC' },
            headerTintColor: '#FFF',
        })
    },
    searchfilterpage: {
        screen: searchfilter,
        navigationOptions: () => ({
            title: 'Filters',
            headerStyle: { backgroundColor: '#66CECC' },
            headerTintColor: '#FFF',
        })
    },

})

export default Main;
