import React, { Component } from 'react';
import {
  Platform,StatusBar,
  StyleSheet,TouchableOpacity,
  Text,BackHandler,
  View,Image
} from 'react-native';
tton for dev menu',
});

export default class Help extends Component {
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{backgroundColor:"#fcfefb", flex:1}}>
  
        <Text style={{fontSize:23,color:"#66CECC", marginTop:10, marginLeft:20}}>List of FAQ</Text>
       
      
        <Text style={{fontSize:18,color:"#66CECC",marginTop:25,marginLeft:15}}>* How to add Product</Text>
       
        <Text style={{fontSize:18,color:"#66CECC",marginTop:15,marginLeft:15}}>* How to update Product</Text>
 
 
        <Text style={{fontSize:18,color:"#66CECC",marginTop:15,marginLeft:15}}>* How to mark Product as sale</Text>
        
       
        <Text style={{fontSize:18,color:"#66CECC",marginTop:15,marginLeft:15}}>* How to change chat settings</Text>
  
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
