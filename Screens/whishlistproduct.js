/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet,Alert,ActivityIndicator,ImageBackground,BackHandler, FlatList,Text, View, Image, TextInput,AsyncStorage, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
// import Toast from 'react-native-simple-toast'; 
import Stars from 'react-native-stars';
import Share, { ShareSheet, Button } from 'react-native-share';
var { width, height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class whishlistproduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
        data1:[],
        uid:'',
      isLoading: true,
      wishlist:'show'
    }
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

 
  componentWillMount() {
      AsyncStorage.getItem('id').then((value)=> {
      console.log('whishlistusername===========' + value);
            this.setState({
                 uid : value,
                });
                this.getData1();
           });
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  // handleOnPress(value) {
  //   this.setState({ value: value })
  // }

  handleBackButtonClick() {
      const { navigate } = this.props.navigation;
    // this.props.navigation.goBack(null);
    navigate("Homescreenpage") 
    return true;
  } 

  getData1() {
    console.log('==========gf===========' + this.state.uid) 
    let options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST'
    };
  
    var param1 = {
      user_id: this.state.uid,
     
    };

    options.body  = new FormData();

    for (var k in param1) {
      options.body.append(k, param1[k]);
    }

    var passUrl = 'https://seoteam.website/api/api.php?method=showwishlist'
    console.log("======passurl=============" + passUrl);
    return fetch(passUrl, options)
    .then(response => {
      return response.json()
        .then(responseJson => {
          if(responseJson.status == 0){
            this.setState({wishlist:'hide'})
          }else{
            this.setState({data1: responseJson.list.productlist,wishlist:'show'});
          }
        
        console.log('++++++++++++++'+ this.state.data1)
        })
        
      })
      .catch((error) => { console.error(error); }); 

}

wishimage(pid){
  var product_id = pid;
  if(this.state.wishlist == "show") {
  return(   
    // <TouchableOpacity onPress={() => this.imageset(product_id)}></TouchableOpacity>
    <TouchableOpacity>
    <Image source={require("../images/fill_heart.png")} style={{alignSelf:'flex-end',resizeMode:'stretch',marginLeft:8,height:25,width:25}}/>
    </TouchableOpacity>
  )  
  }else{
    return(
      <TouchableOpacity>
    <Image source={require("../images/empty_heart.png")} style={{alignSelf:'flex-end',resizeMode:'stretch',marginLeft:8,height:25,width:25}}/>
    </TouchableOpacity>
  )       
  }
}

  _renderItem1 = (itemData) => {
    var pid = itemData.item.productid
    // console.log(+pid)
    if (itemData.item.image == null) {
      var images = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-EEhlOPI8EgWJsU7NDWt1vRf2T_CypsqE1M2Mm3MBVDYJUW5"
    }
    else {
      var images = itemData.item.image
    }
    const { navigate } = this.props.navigation;
    return (
      // <TouchableOpacity style={{
      //   shadowColor: '#000000', shadowOffset: { width: 0, height: 0.5 },
      //   shadowOpacity: 0.4, shadowRadius: 2, elevation: 1.5, borderColor: '#e6e6e6'
      //   , alignItems: "center", backgroundColor: '#66CECC', height: 202, width: "47%",
      //   borderRadius: 0, margin: 5, padding: 5
      // }} onPress={() => navigate('productpage', {product_id: pid,reviewcheck:this.state.uid,wishlistpage:'page'})}>

      //   <Image source={{ uri: images }}
      //     style={{ height: "70%", width: "100%", alignSelf: "center", resizeMode: "contain", justifyContent: 'center', alignItems: 'center' }} />

      //   <Text style={{ color: '#000', fontWeight: "bold", marginTop: 5 }}>{itemData.item.productname}</Text>
      //   <View style={{ borderRadius: 15, backgroundColor: "#DCDCDC", height: 22, width: 60, alignSelf: "flex-end", marginTop: 5, margin: 4, justifyContent: "center" }}>
      //   <Text style={{ color: '#000', fontWeight: "bold", alignSelf: "center" }}>${itemData.item.price}</Text>
      //   </View>

      // </TouchableOpacity>
<View style={{height:202,width:'47%',margin:5,shadowOffset: { width: 0, height: 0.5 },shadowOpacity: 0.4, shadowRadius: 2, elevation: 1.5, borderColor: '#66CECC',borderWidth:2}}> 
  <ImageBackground source={{ uri: images}} style={{height: "100%", width: "100%"}}> 
  <View style={{ borderRadius: 15,marginTop:5, alignSelf: "flex-end",marginRight: 4,marginBottom:4, justifyContent: "center" }}>{this.wishimage(pid)}</View>
  <TouchableOpacity onPress={() => navigate('productpage', { product_id: pid, reviewcheck:this.state.uid,productlink:itemData.item.productlink,wishlistpage:'page'})}>
  <View style={{height: "65%", width: "100%",alignItems:'center',justifyContent:'center'}} >
  <View style={{ height: "80%", width: "100%", alignSelf: "center"}}></View>
   
  </View>
  <View style={{ backgroundColor: "#000", opacity: 0.8, height: 50, width: "100%"}}>
  <Text style={{ color: '#fff', fontWeight: "bold", marginTop: 5 ,marginLeft:10}}
  numberOfLines={1}>{itemData.item.productname}</Text>
  <View style={{ borderRadius: 15, backgroundColor: "#fff", height: 22, width: 60, alignSelf: "flex-end",marginRight: 4,marginBottom:4, justifyContent: "center" }}><Text style={{ color: '#000', fontWeight: "bold", alignSelf: "center" }}>${itemData.item.price}</Text>
       </View>
  </View>  
  </TouchableOpacity>
  </ImageBackground>
  </View>

    );
  }

  _keyExtractor = (item, index) => index;
 
  render() {
    console.log("wishlistdata===="+this.state.data1)
    if(this.state.wishlist == 'hide'){
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{margin:20,fontWeight:"bold"}}>No Products Found</Text>
        </View>
      )
    }else{
      return (
      <View style={styles.container}>
      {/* <Text style={{margin:20,fontWeight:"bold"}}>Product List</Text>       */}
        <FlatList
            data={this.state.data1.reverse()}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem1}
            numColumns={2}
            keyExtractor={this._keyExtractor}>
         </FlatList>
        
           
      </View>

    );
   }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfefb',
  },
  welcome: {
    fontSize: 20,
    fontWeight:"bold",
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    marginTop: 5,
    height: 35,
    width: width - 25,
    borderWidth: 2,
    borderRadius: 2,
    padding: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.5,
    borderColor: '#e6e6e6'
  },
});
