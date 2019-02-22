/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet,Alert,ToastAndroid,FlatList,ActivityIndicator,BackHandler, Text, View, Image, TextInput,AsyncStorage, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
// import Toast from 'react-native-simple-toast'; 
import Stars from 'react-native-stars';
import Share, { ShareSheet, Button } from 'react-native-share';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { createImageProgress } from 'react-native-image-progress';
// import ImageZoom from 'react-native-image-pan-zoom';
import Slideshow from 'react-native-slideshow';
const Image1 = createImageProgress(Image);
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
      imagestaticdata:[{
        url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZKwJpCwb0odxjpWN8lwyvLXsfPcTk8tpuafSBvv0NMCZKv7Grtw'
        },
        {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IO64J8CEGBRpV4tjWYyaWzgSBxFOHuAbfrp3TL_PXA8wLh93yA',
        
        },
        {
        url: 'https://cdn.mos.cms.futurecdn.net/df65adee6e59a7b4dbf9a41b68c8fe38-480-80.jpg',
        
    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'
        
        },
        {
        url: 'https://ksassets.timeincuk.net/wp/uploads/sites/54/2015/10/iphone-6s-plus-drop-screen-1-300x225.gif'
        
        }],
      position: 1,
      latitude: 0,
      longitude: 0,
      latitude1:56.13,
      longitude2: 106.34,
      data: [],
      data2:[],
      productid :'',
      img:'',
      name:'',
      Price:'',
      address:'',
      city:'',
      sellerid:'',
      state:'',
      imageopenurl:'https://ksassets.timeincuk.net/wp/uploads/sites/54/2015/10/iphone-6s-plus-drop-screen-1-300x225.gif',
      views_count:'',
      date:'',
      uid:'',
      uname:'',
      firstname:'',
      description:'',
      wishlist:null,
      image_liked:'data:image/png;base64,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',
      productliked:0,
      showIndicator:true,
      isLoading: true,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

 
  componentWillMount() {

    AsyncStorage.getItem('id').then((value) => {
      //console.log('id' + value);
      if (value == null) {
          //this.gotoPages("ScreenOne", { page: 'ab' })
         // this.setState({uid:'Login'})
         this.getData();
          // console.log('Going to login screen');
      }
      else {
          AsyncStorage.getItem('id').then((Username) => {
              console.log('value get method' + Username);
             this.setState({uid:Username})
             // this.gotoPages("Profilepage")
             // console.log('Going');
             this.getData();
             this.getprofileData();
             // navigate('Homescreenpage');
          });
      }      
      
  });
  this.setState({         
    position: this.state.position === this.state.imagestaticdata.length ? 0 : this.state.position + 1
  });
        
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  getprofileData() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
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
    options.body = new FormData();
    for (var k in param1) {
      options.body.append(k, param1[k]);
    }

    var passUrl = 'https://seoteam.website/api/api.php?method=usermeta'
    console.log("======passurl=============" + passUrl);
    return fetch(passUrl, options)
      .then(response => {
        return response.json()
          .then(responseJson => {
        this.setState({ firstname: responseJson.first_name });
        console.log('==========message===========' + responseJson.first_name)       

      })
    })
      .catch((error) => { console.error(error); });
  }

  handleBackButtonClick() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    
    if(params.wishlistpage == 'page'){
      // this.props.navigation.goBack('whishlistproductpage'); 
      // return true;
     navigate('whishlistproductpage');
     return true;
    }else{
      this.props.navigation.goBack(null); 
      return true;
    }
   
  }

  imageset(){
    const { navigate } = this.props.navigation;
    if(this.state.uid == '')
    {
      // ToastAndroid.show("Please login first",ToastAndroid.LONG);
      navigate("ScreenOne",{page: 'ab'}) 
    }
    else{
    if(this.state.wishlist == 0){
    this.setState({wishlist:1})
    }else{
    this.setState({wishlist:0})
    }

const { params } = this.props.navigation.state;
    console.log("========imagevale========"+this.state.wishlist)
    console.log('==========gf===========' + this.state.uid) 
    
    let options = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST'
    };
  
    var param1 = {
      user_id:this.state.uid,
      product_id: this.state.productid,
     
    };

    options.body= new FormData();
    for (var k in param1) {
      options.body.append(k, param1[k]);
    }

    var passUrl = 'https://seoteam.website/api/api.php?method=wishlist'
    console.log("======passurl=============" + passUrl);
    return fetch(passUrl, options)
    .then(response => {
      return response.json()
        .then(responseJson => {
          ToastAndroid.show(responseJson.message,ToastAndroid.LONG); 
        })
    })
   
      .catch((error) => { console.error(error); });

  }
  }

  _renderItem = (itemData) => {
 
    const { navigate } = this.props.navigation;
    if (itemData.item.url) {
    return (
    <View style={{ flex: 1, flexDirection: 'column',borderRadius:5,marginTop:10}}> 
    <TouchableOpacity
    style={{borderRadius:5}}
    onPress={() => {
    // if(this.state.networkType)
    // {
    // Toast.show('Oops no internet connection !', Toast.SHORT); 
    
    // }
    // else
    // {
    this.setState({imageopenurl:itemData.item.url});
    // }
    }}
    > 
    <Image1 
    // indicator={ProgressPie}
    // indicatorProps={{
    // color: 'rgba(33,37,101,1)}'
    
    // }} 
    source={{ uri: itemData.item.url }}
    style={{ width: (width * 29) / 100, height: (width * 22) / 100, borderRadius:5,alignItems:'center',justifyContent:'center',marginLeft:5,marginRight:5}} > 
    </Image1> 
    </TouchableOpacity>
    </View>
    );
    }
   
   }
   _keyExtractor = (item, index) => index;
  

  getData() {
    console.log("======getdata=============");
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    var passUrl = 'https://seoteam.website/api/api.php?method=single_product&product_id='+params.product_id+'&user_id='+this.state.uid;
    console.log('*****************product********************' + passUrl);
    return fetch(passUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        var lat = 0;
        var long = 0;
        if(responseJson.productdata[0].post_latitude){         
       if(responseJson.productdata[0].post_latitude == null){
            lat =0 //here we convert data into float
            long =0
           }
          else if(responseJson.productdata[0].post_latitude == undefined){
              lat =0 //here we convert data into float
              long =0
             }
           else{
                lat =parseFloat(responseJson.productdata[0].post_latitude) //here we convert data into float
                long =parseFloat(responseJson.productdata[0].post_longitude)
               }
           }    
        console.log("VAlue Received ===" + responseJson.productdata[0].post_latitude);
        console.log('==========longitudevar===========' + lat)
        console.log('==========longitudevar===========' + long)
        this.setState({
          productid:responseJson.productdata[0].productid,
          sellerid:responseJson.productdata[0].sellerid,
          img:responseJson.productdata[0].image,
          imageopenurl:responseJson.productdata[0].image,
          name:responseJson.productdata[0].productname,
          Price:responseJson.productdata[0].price, 
          address:responseJson.productdata[0].post_address,
          city:responseJson.productdata[0].post_city,
          state:responseJson.productdata[0].post_state,
          views_count:responseJson.productdata[0].wpb_post_views_count,
          date:responseJson.productdata[0].post_date,          
          description:responseJson.productdata[0].description,
          wishlist:responseJson.productdata[0].wishlist,
          latitude1:lat,//getting lat and longitude from api end where we send 
          longitude2:long, 
          showIndicator:false
        });

        insertindex=0;
    this.state.imagestaticdata.splice(insertindex,0,{url:responseJson.productdata[0].image})
      
        console.log('==========data===========' + this.state.data)

      })
      .catch((error) => { console.error(error); });
  }

  

  reviewcheck(){
  //  this.valueget();
  const { params } = this.props.navigation.state;
  if(params.reviewcheck == 'SignOut'){
    console.log("abcif-------"+this.state.uid);
  return(
  <Stars
    half={true}
    rating={2.5}
    //update={(val) => { this.setState({ stars: val }) }}
    spacing={4}
    starSize={30}
    count={5}
    fullStar={require('../images/starFilled.png')}
    emptyStar={require('../images/starEmpty.png')}
    halfStar={require('../images/starHalf.png')} /> 
   );
  }
  else{
    console.log("xyxelsewwww-------"+this.state.uid);
    return(
  <Stars
       half={true}
       value={4.0}
       update={(val) => { this.setState({ stars: val }) }}
       spacing={4}
       starSize={30}
       count={5}
       fullStar={require('../images/starFilled.png')}
       emptyStar={require('../images/starEmpty.png')}
       halfStar={require('../images/starHalf.png')} />
    );
  }
}

checkchat(){ 
  const { navigate } = this.props.navigation;
  if(this.state.uid == '')
  {
    // ToastAndroid.show("Please login first",ToastAndroid.LONG); 
    navigate("ScreenOne",{page: 'ab'}) 
  }
  else{
       const { navigate } = this.props.navigation;
        navigate('chatpage', { username: this.state.firstname, userid: this.state.uid, 
        productid: this.state.productid, sellerid: this.state.sellerid ,productname:this.state.name,
        apiuid:this.state.uid,apisid:this.state.sellerid})
  }}

  wishimage(){
    if(this.state.wishlist == 1) {
    return(   
      <Image source={require("../images/red_heart.png")} style={{resizeMode:'stretch',marginLeft:8,height:35,width:35}}/>
    )  
    }else{
      return(
      <Image source={require("../images/white_heart.png")} style={{resizeMode:'stretch',marginLeft:8,height:35,width:35}}/>
    )       
    }
  }

  render() {
    if(this.state.showIndicator == true){
      return(
      <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <ActivityIndicator size="large" color="#66CECC" />
      </View>
      );
      }
      else{
    const { params } = this.props.navigation.state;
    console.log('==========uidyyy===========' + this.state.uid)
    console.log('==========wishlistrender===========' + this.state.wishlist)
    var productshare = params.productlink

    let shareOptions = {
      title: "",
      message: "",
      url: productshare,
      subject: "Share App" //  for email
    };

    var wishimage="";
   
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
      <View style={{flex:0.5,backgroundColor:'#66CECC',justifyContent:'center'}}>
      <Slideshow
               dataSource={this.state.imagestaticdata}
               position={this.state.position}
               onPositionChanged={position => this.setState({ position })}
             />
      </View>
         
         <View style={{flex:0.5}}> 

         <View style={{flex:3,flexDirection:"row"}}>
         <View style={{ flex: 1.6}}>
         <Text style={styles.welcome}>{this.state.name}</Text>
         <Text style={{fontWeight:"bold",fontSize:20,marginLeft:15,margin:3,color:"#66CECC"}}>${this.state.Price}</Text>
         </View>
         <View style={{ flex:0.7,alignSelf:"flex-start"}}>
         <TouchableOpacity
              style={{ alignSelf: "center", width:150, backgroundColor: '#fff',marginTop:10}}
              onPress={() => this.imageset()}>
                <View style={{alignItems:"center"}}>
                   {/* <Image source={require(wishimage)} style={{resizeMode:'stretch',marginLeft:8,height:37,width:40}}/> */}
                   <View>{this.wishimage()}</View>
              <Text style={{
                color: '#000',
                padding: 5,
                margin: 5,
                 alignSelf: "center" 
              }}>Add to Wishlist</Text>
              </View>
            </TouchableOpacity>
           
            </View>
            <View style={{ flex: 0.7}}>
         <TouchableOpacity
              style={{ alignSelf: "center", backgroundColor: '#fff', marginLeft: 5 ,marginTop:10}}
              onPress={() => Share.open(shareOptions)}>
                <View style={{alignItems:"center"}}>
                   <Image source={require('../images/share.png')} style={{height:35,width:35}}/>
              <Text style={{
                color: '#000',
                padding: 5,
                margin: 6,
                 alignSelf: "center" 
              }}>Share</Text>
              </View>
            </TouchableOpacity>
            </View>
         </View>    
          
          <View style={{alignItems:"center"}}>
          
          <Text style={{alignSelf:"center",marginLeft:15,margin:5,color:"#000"}}>{this.state.description}</Text>
          <TouchableOpacity 
         style={{borderRadius:20,backgroundColor:'#B22222',margin:5}}
          onPress={() => this.checkchat()}> 
          {/* ,{username:this.state.firstname,userid:this.state.uid,productid:this.state.productid,sellerid:this.state.sellerid} */}
            <Text style = {{color:'#fff',padding:5,margin:5,fontWeight:"bold"}}>Make a Deal Now!</Text>
         </TouchableOpacity>
         <View style={{flexDirection:"row",marginTop:20,margin:10}}>
         <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:18,marginLeft:15,margin:5,color:"#000"}}>Reviews</Text>
         <View>{this.reviewcheck()}</View>

         </View>
         </View>
         </View>
         <View style={{alignItems:"center"}}>
   <MapView
        provider={ PROVIDER_GOOGLE }
        style={{height:100,width:300}}
        initialRegion={{
          latitude: this.state.latitude1,
          longitude: this.state.longitude2,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
      <MapView.Marker
          coordinate={{    
            latitude: this.state.latitude1,
            longitude: this.state.longitude2,
            latitudeDelta: this.state.latitude1,
            longitudeDelta: this.state.longitude2,} }
        />
        </MapView>
      </View>
      
      </View>

    );}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
// marginTop:20,
    backgroundColor: '#fcfefb',
  },
  welcome: {
    fontSize: 22,
    fontWeight:"bold",
    margin: 10,
    color:'#000'
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
