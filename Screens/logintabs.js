/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage,Platform, StyleSheet, Text, View,TouchableOpacity,Image,TextInput,Dimensions} from 'react-native';
import Toast from 'react-native-simple-toast'; 
import Prompt from 'react-native-prompt';
var {width,height}=Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class logintabs extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      data1: [],
      username:'',
      user_login:'',
      userpassword:'',
      promptVisible: false,
      isLoading: true
    }
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  // componentWillMount() {
  //   const { navigate } = this.props.navigation;
  //  // AsyncStorage.getItem
  //  AsyncStorage.getItem('username').then((value) => {
  //     console.log('username' + value);
  //     if (value == null) {
  //        navigate("logintabspage")  
  //   console.log('Going to login screen');
  // }
  //   else{
  //     AsyncStorage.getItem('username').then((Username)=> {
  //       console.log('username' + Username);
         
  //         console.log('Going to Home screen');
  //         navigate('Homescreenpage');
     
  //     });
  //   }});
  // }

  post_data(){ 
          
    const { navigate } = this.props.navigation;
    var params = {
     // useremail:this.state.useremail,
      username: this.state.username,
      password:this.state.userpassword
  };
  
  var formData = new FormData();
  
  for (var k in params) {
      formData.append(k, params[k]);
  }

  var passUrl = "https://seoteam.website/api/api.php?method=login";
  console.log("======passurl============="+ passUrl);
  fetch(passUrl, {
    method: 'POST',
    headers: {              
             'Content-Type': 'application/formData'
             },
    body: formData })
  .then((response) =>(response.json())) 
  .then((responseJson) =>{
   
    this.setState({ data: responseJson.message });   
    console.log('==========message===========' + this.state.data)       
    console.log('==========username===========' + this.state.username)  
    console.log('==========userpassword===========' + this.state.userpassword)  
   // Toast.show(this.state.data,Toast.SHORT);

   var Username = responseJson.username;
   AsyncStorage.setItem('username',JSON.stringify(Username));
 
 if (this.state.data = "Successfully login")
 {
  navigate("Homescreenpage")
  Toast.show(this.state.data,Toast.SHORT);
 }
 else {
  Toast.show("wrong detials..."+this.state.data,Toast.SHORT);
 }
})    
  .catch((err) => { console.log("==========error==========" + err); })
}  
   

post_data1(){ 
          
  const { navigate } = this.props.navigation;
  var params = {
   // useremail:this.state.useremail,
   user_login: this.state.user_login,
   // password:this.state.userpassword
};

var formData = new FormData();

for (var k in params) {
    formData.append(k, params[k]);
}

var passUrl = "https://seoteam.website/api/api.php?method=forgetpassword";
console.log("======passurl============="+ passUrl);
fetch(passUrl, {
  method: 'POST',
  headers: {              
           'Content-Type': 'application/formData'
           },
  body: formData })
.then((response) =>(response.json())) 
.then((responseJson) =>{
 
  this.setState({ data1: responseJson.message });   
  console.log('==========message===========' + this.state.data1)       
  console.log('==========username===========' + this.state.user_login)  

 Toast.show(this.state.data1,Toast.SHORT);

 

})    
.catch((err) => { console.log("==========error==========" + err); })
}  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
         <View style={{  flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18b4ac',}}>
       <Image source={require('../images/Logo.jpeg')} style={{height:120,width:120}}/>
    </View>
         <View style={{Flex:0.4}}>
         <View style={{  flexDirection: 'row' }}>
            <View style={{flex:1}}><TouchableOpacity activeOpacity={.5} >
                <View style={{
                  backgroundColor: "#24a9a6",  height: 45, alignItems: "center",
                  justifyContent: "center", borderBottomWidth:2,borderBottomColor:"000"
                }}   onPress={() => navigate('')}>
                  <Text style={styles.button}>LOGIN</Text>
                </View></TouchableOpacity>
                </View>
                <View style={{flex:1}}>
              <TouchableOpacity activeOpacity={.5} onPress={() => navigate('signuppage')} >
                <View style={{
                  backgroundColor: "#24a9a6", height: 45, alignItems: "center",
                  justifyContent: "center"
                }} >
                  <Text style={styles.button}>SIGN UP</Text>
                </View></TouchableOpacity>
</View>

            </View>
        
        
         <View style={{alignItems: "center", marginTop:20}}>

         
            <TextInput
              placeholder='Email Id'
              style={styles.input}
              // underlineColorAndroid='transparent'
              
              onChangeText={value => this.setState({ username: value.trim() })}
           
            />
            <TextInput ref='Password' 
            placeholder='Password'
             secureTextEntry style={styles.input}
              underlineColorAndroid='transparent' 
              onChangeText={value => this.setState({ userpassword: value.trim() })} />

          <TouchableOpacity  activeOpacity={.5} onPress={() => this.setState({ promptVisible: true })}>
            <View><Text style={{marginTop:25,
      color: '#F88B88',
      backgroundColor: 'transparent',
      fontSize: 20}}>Forgot Password ?</Text></View></TouchableOpacity>
          <Prompt
            title='Forget Password'
            placeholder='Enter Your Email'
            visible={this.state.promptVisible}
            onChangeText={value => this.setState({ user_login: value.trim() })}
            onCancel={() => this.setState({ promptVisible: false, message: 'You cancelled' })}
            onSubmit={(value) => (this.setState({ promptVisible: false, message: `You said '${value}'` }),
            this.post_data1())}/>
         <TouchableOpacity 
         style={{borderRadius:20,backgroundColor:'#ff886b',margin:10}}
          onPress={() => this.post_data()}>
            <Text style = {styles.button}>    Log In     </Text>
         </TouchableOpacity>
         </View>
        
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfefb',
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
  
   color:'#fff',
    padding:5,
    margin:10,
    fontWeight:"bold"

 },
 button1: {
  
  color:'#000',
   padding:5,
   marginTop:20,

},
input: {
  marginTop: 15,
  height:40,
  width: width - 25,
    paddingLeft:5,
    borderBottomWidth: 1,
    borderBottomColor: '#24a9a6',
  
},

});
{/* <Image source={require('./Facebook.png')} style={{marginTop:20,height:10,width:10}}/> */}


// import React, { Component } from 'react';
// import { StatusBar,TouchableOpacity, View, StyleSheet, Dimensions,Image } from 'react-native';

// import { TabNavigator } from 'react-navigation';


// import Login from './Loginscreen';
// import Home from './home';

// var {height, width} = Dimensions.get('window');
// const logintabs = TabNavigator({   
    
//         Home: { screen: Login ,
//             navigationOptions: {
//                 tabBarLabel:"Login",
//                 // tabBarIcon: ({ tintColor }) => (
//                 //     <Image   style={ {width: 22,
//                 //         height: 22, tintColor: tintColor}} source={require('../images/icon.png')}
//                 //     />
                    
//                 // )
//               },},
//         Leads: { screen: Home  ,
//             navigationOptions: {
//                 tabBarLabel:"SignUp",
//                 // tabBarIcon: ({ tintColor }) => (
//                 //     <Image   style={ {width: 22,
//                 //         height: 22, tintColor: tintColor}} source={require('../images/leads.png')}
//                 //     />
                    
//                 // )
//               }, },
//         // Prospects: { screen: Committed_leads ,
//         //     navigationOptions: {
//         //         tabBarLabel:"Prospects",
//         //         tabBarIcon: ({ tintColor }) => (
//         //             <Image   style={ {width: 22,
//         //                 height: 22, tintColor: tintColor}} source={require('../images/prospects.png')}
//         //             />
                    
//         //         )
//         //       },},
//         // Todaysfolloups: { screen: Today_followup  ,
//         //     navigationOptions: {
//         //         tabBarLabel:"Todaysfollowup",
//         //         tabBarIcon: ({ tintColor }) => (  
//         //             <Image   style={ {width: 22,
//         //                 height: 22, tintColor: tintColor}} source={require('../images/todayfolloups.png')}
//         //             />
                    
//         //         )
//         //       },},
 
// },
//     {
//         swipeEnabled: true,
//         shifting: true,
//         initialRouteName: 'Home',
//         tabBarPosition: "center",
       
//   backBehavior:'none', 
//   // tabBarPosition:'bottom', 
  
//   tabBarOptions: { 
//   pressOpacity:0.1,
//   upperCaseLabel: false, 
//   activeBackgroundColor:'#fff',
//   // activeTintColor: '#ffffff',
//   activeTintColor:'#ff7e7a',
//   inactiveTintColor: '#000',
  
//   scrollEnabled:true,
  

//   indicatorStyle: { 
//   // borderBottomColor: '#bc2326',
//   borderTopColor:'#109d58',
//   borderTopWidth: 10,
//   },

//   pressColor:'rgba(33,37,101,0.7)',
//   // pressColor:'#109d58', 

//   labelStyle:{ 
//   fontSize: width*0.025, 
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontWeight: "bold",
//   margin:-10
//   },

//   style:{
//   // backgroundColor: '#194fc3',
//   backgroundColor:'white'
//   },

//   tabStyle: {
//   // width:width*0.34,
//   width:width/2, 
//   height:height*0.05,
//   },
// }
// });
//  export default  logintabs ;
