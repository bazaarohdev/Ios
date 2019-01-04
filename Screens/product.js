/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet,Alert, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast'; 
import Stars from 'react-native-stars';
var { width, height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      data2:[],
      productid :'',
      img:'',
      name:'',
      Price:'',
      address:'',
      city:'',
      state:'',
      views_count:'',
      date:'',
      isLoading: true
    }
    //  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

 
  componentWillMount() {
    this.getData();
   
  }


  getData() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    var passUrl = 'https://seoteam.website/api/api.php?method=single_product&product_id='+params.product_id;
    console.log('*****************product********************' + passUrl);
    return fetch(passUrl)

      .then((response) => response.json())

      .then((responseJson) => {

        this.setState({
          productid:responseJson.productdata[0].productid,
          img:responseJson.productdata[0].image,
          name:responseJson.productdata[0].productname,
          Price:responseJson.productdata[0].price, 
        address:responseJson.productdata[0].post_address,
        city:responseJson.productdata[0].post_city,
          state:responseJson.productdata[0].post_state,
          views_count:responseJson.productdata[0].wpb_post_views_count,
          date:responseJson.productdata[0].post_date,
          
          isLoading: false
        });
        console.log('==========data===========' + this.state.data)

      })
      .catch((error) => { console.error(error); });
  }

  postdeletedata() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
   
    var abc = {
      post_id:params.product_id,
      
  };
  
  var formData = new FormData();
  
  for (var k in abc) {
      formData.append(k, abc[k]);
  }
    var passUrl = 'https://seoteam.website/api/api.php?method=product_delete'
    console.log("======product_delete============="+ passUrl);
    fetch(passUrl, {
      method: 'POST',
      headers: {              
               'Content-Type': 'application/formData'
               },
      body: formData })
    .then((response) =>(response.json())) 
    .then((responseJson) =>{
     
      this.setState({ data2: responseJson.message });   
      console.log('==========deletemessage===========' + this.state.data2)       
      Toast.show(this.state.data2,Toast.SHORT);
      navigate('Homescreenpage');
      })
      .catch((error) => { console.error(error); });
  }
  render() {
    const { navigate } = this.props.navigation;

    var pid = this.state.productid
    if (this.state.img == null) {
      var image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-EEhlOPI8EgWJsU7NDWt1vRf2T_CypsqE1M2Mm3MBVDYJUW5"
    }
    else {
      var image = this.state.img
    }
    return (

      <View style={styles.container}>
      <View style={{flex:0.4,backgroundColor:'#66CECC'}}>
      <View style={{flexDirection:  "row",alignSelf:"center",marginTop:10}}>
      <TouchableOpacity
              style={{ alignSelf: "center", width: 40, borderRadius: 5,marginLeft:5 }}
              onPress={() => navigate('Homescreenpage',{product_id:pid})}>
                 <View style={{flexDirection:"row", alignItems:"center"}}>
                   <Image source={require('../images/cancel.png')} style={{marginLeft:8,height:20,width:20}}/>
                     </View>  
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: "center", width: 150, borderRadius: 5, backgroundColor: '#DCDCDC', margin: 5 }}
              onPress={() => navigate('editproductpage',{product_id:pid})}>
                 <View style={{flexDirection:"row", alignItems:"center"}}>
                   <Image source={require('../images/pencil.png')} style={{marginLeft:8,height:15,width:15}}/>
              <Text style={{
                color: '#000',
                padding: 5,
                margin: 5,
                 alignSelf: "center" 
              }}>EDIT PRODUCT</Text>
               </View>  
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignSelf: "center", width: 160, borderRadius: 5, backgroundColor: '#C70039',margin: 5 }}
              onPress={() => {
               
                  Alert.alert(
                    'Delete product',
                    'Are you sure you want to delete your produyct?', [{
                      text: 'No',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    }, {
                      text: 'Yes', 
                      onPress: () => this.postdeletedata()
                    },], {
                      cancelable: false
                    }
                  )
                
              }}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                <Image source={require('../images/stop.png')} style={{marginLeft:8,height:15,width:15}}/>
              <Text style={{
                color: '#fff',
                padding: 5,
                margin: 5,
                alignSelf: "center"
              }}>DELETE PRODUCT</Text>
                </View>  
            </TouchableOpacity>

            </View>

        
            <Image source={{uri:image}} style={{ height:180, width: "100%",alignSelf:"center",resizeMode:"contain"}} />
     
          </View>
          <View style={{flex:0.6}}>
         <View style={{flex:3,flexDirection:"row"}}>
         <View style={{ flex: 1}}>
         <Text style={styles.welcome}>{this.state.name}</Text>
         <Text style={{fontWeight:"bold",fontSize:18,marginLeft:15,margin:5,color:"#66CECC"}}>$ {this.state.Price}</Text>
         </View>
         <View style={{ flex: 1,alignSelf:"flex-start"}}>
         <TouchableOpacity
              style={{ alignSelf: "center", width:150, backgroundColor: '#fff',marginTop:10}}
              onPress={() => navigate('')}>
                <View style={{alignItems:"center"}}>
                   <Image source={require('../images/heartlike.png')} style={{marginLeft:8,height:35,width:35}}/>
              <Text style={{
                color: '#000',
                padding: 5,
                margin: 5,
                 alignSelf: "center" 
              }}>Add to Whishlist</Text>
              </View>
            </TouchableOpacity>
           
            </View>
            <View style={{ flex: 1}}>
         <TouchableOpacity
              style={{ alignSelf: "center", backgroundColor: '#fff', marginLeft: 5 ,marginTop:10}}
              onPress={() => navigate('')}>
                <View style={{alignItems:"center"}}>
                   <Image source={require('../images/share.png')} style={{height:35,width:35}}/>
              <Text style={{
                color: '#000',
                padding: 5,
                margin: 5,
                 alignSelf: "center" 
              }}>Share</Text>
              </View>
            </TouchableOpacity>
            </View>
         </View>
          
          <View style={{alignItems:"center"}}>
          
          <Text style={{alignSelf:"center",marginLeft:15,margin:5,color:"#000"}}>Description of product goes in here</Text>
          <TouchableOpacity 
         style={{borderRadius:20,backgroundColor:'#B22222',margin:5}}
          onPress={() => navigate('')}>
            <Text style = {{color:'#fff',
   padding:5,
   margin:5,
   fontWeight:"bold"}}>        Make a Deal Now !         </Text>
         </TouchableOpacity>
         <View style={{flexDirection:"row",marginTop:20,margin:10}}>
         <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:18,marginLeft:15,margin:5,color:"#000"}}>Reviews</Text>
         <Stars
            half={true}
            rating={2.5}
            update={(val) => { this.setState({ stars: val }) }}
            spacing={4}
            starSize={30}
            count={5}
            fullStar={require('../images/starFilled.png')}
            emptyStar={require('../images/starEmpty.png')}
            halfStar={require('../images/starHalf.png')} />
         </View>
         </View>
         </View>
           
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
marginTop:15,
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
