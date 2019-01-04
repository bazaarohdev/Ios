/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage,Platform, StyleSheet, Text, View,TouchableOpacity,Image,Linking} from 'react-native';
//import {LoginManager} from 'react-native-fbsdk';
d
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
GoogleSignin.configure();
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '803787365139-f17pfrudqh0810i8dkg3fphlljkljljkljkped7hdrml.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '803787365139-fut199oqe3eltbi34nh17pfg0btjklkjl5c7cf.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default class Loginscreen extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
       name: "",
        photoUrl: "",
        txt_input_email: '',
        txt_input_password: '',
        user: null,
        loginType: null,
        isLogged: null,
        userName: null,
        userEmail: null,
        normal: "normal",
        google: "google",
        fb: "facebook",
        fbUser: null,
        fbEmail: null,
        userPic: null,

  }
}
// _signIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     this.setState({ userInfo });
//   } catch (error) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       // user cancelled the login flow
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       // operation (f.e. sign in) is in progress already
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       // play services not available or outdated
//     } else {
//       // some other error happened
//     }
//   }
// };

// signIn = async () => {
//   try {
//     const result = await Expo.Google.logInAsync({
//       iosClientId: "803787365139-fut199oqe3eltbi34nh17pfg0bt5c7cf.apps.googleusercontent.com",  
//       scopes: ["profile", "email"]
//     })
//     if (result.type === "success") {
//       this.setState({
//         signedIn: true,
//         name: result.user.name,
//         photoUrl: result.user.photoUrl
//       })
//     } else {
//       console.log("cancelled")
//     }
// } catch (e) {
//     console.log("error", e)
//   }
// }


    
    //   _Home() {
    //     const { navigate } = this.props.navigation;
    //     var user = this.state.userName
    //     this.setState({ loginType: this.state.google, userName: this.state.user.name, userEmail: this.state.user.email, userPic: this.state.user.photo }, () => {
    //         AsyncStorage.setItem("isLoggedIn", "true");
    //         AsyncStorage.setItem("LoginType", this.state.loginType);
    //         AsyncStorage.setItem("UserName", this.state.userName);
    //         AsyncStorage.setItem("Email", this.state.userEmail);
    //         AsyncStorage.setItem("UserPic", this.state.userPic);
    //         navigate('Homescreenpage',{username:user});
    //     });
    // }
    
    
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>


      <Image source={require('../images/Logo.jpeg')} style={{height:120,width:120}}/>
  <Text style = {styles.welcome}>
           Quickly Connect with
            </Text>
        <TouchableOpacity style={{borderRadius:20,backgroundColor:'#4267B2',margin:10}} onPress={this.fbAuth.bind(this)}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
         <Image source={require('../images/facebookicon.png')} style={{marginLeft:15,height:30,width:30}}/>
            <Text style = {{color:'#fff',
    padding:5,
    margin:10,
    fontWeight:"bold"
}}>Continue with Facebook</Text></View>    
         </TouchableOpacity>
         <TouchableOpacity style={{borderRadius:20,backgroundColor:'#3f72e3',margin:10}} onPress={this.googleAuth.bind(this)}>
         <View style={{flexDirection:"row", alignItems:"center"}}>
         <Image source={require('../images/googleicon.png')} style={{marginLeft:15,height:30,width:30}}/>
            <Text style = {{color:'#fff',
    padding:5,
    margin:10,
    fontWeight:"bold"
}}>Continue with Google    </Text></View>
         </TouchableOpacity >
         <Text style = {styles.welcome}>
            Or Use Your Email
            </Text>
         <TouchableOpacity 
         style={{borderRadius:20,backgroundColor:'#ff886b',margin:10}}
          onPress={() => navigate('logintabspage')}>
            <Text style = {{color:'#fff',
   padding:5,
   margin:10,
   fontWeight:"bold"}}>        Continue with Email         </Text>
         </TouchableOpacity>
         <Text style = {styles.button1}>
           By signing up or logging in, you agree to our
            </Text>
            <View style={{flexDirection:"row"}}>
            <Text style={{color: '#18b4ac'}} onPress={() => {Linking.openURL('http://www.google.com/')}} >
         Terms & conditions 
            </Text>
            <Text style = {{ color:'#000',}}> and </Text>
            <Text style={{color: '#18b4ac'}} onPress={() => {Linking.openURL('http://www.google.com/')}} >
          Privacy policy
            </Text>
            </View>
            
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

 },
 button1: {
  
  color:'#000',
   padding:5,
   margin:2,

}

});
{/* <Image source={require('./Facebook.png')} style={{marginTop:20,height:10,width:10}}/> */}
