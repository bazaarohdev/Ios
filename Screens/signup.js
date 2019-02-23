/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity,Image,TextInput,Dimensions} from 'react-native';
import Toast from 'react-native-simple-toast'; 
var {width,height}=Dimensions.get('window');




export default class signup extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      useremail:'',
      username:'',
      userpassword:'',
      isLoading: true
    }
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

   

        post_data(){ 
          
          const { navigate } = this.props.navigation;
          var params = {
            useremail:this.state.useremail,
            username: this.state.username,
            userpassword:this.state.userpassword  
        };
        
        var formData = new FormData();
        
        for (var k in params) {
            formData.append(k, params[k]);
        }
    
        var passUrl = "https://seoteam.website/api/api.php?method=register";
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
          Toast.show(this.state.data,Toast.SHORT);
       if (this.state.data ='Account created')
       {
        navigate("logintabspage")
       }
       else
       {
        Toast.show("Enter correct detials..."+this.state.data,Toast.SHORT);
       }
       
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
            <View style={{flex:1}}><TouchableOpacity activeOpacity={.5} onPress={() => navigate('logintabspage')}>
                <View style={{
                  backgroundColor: "#24a9a6",  height: 45, alignItems: "center",
                  justifyContent: "center",  
                }}  > 
                  <Text style={styles.button}>LOGIN</Text>
                </View></TouchableOpacity>
                </View>
                <View style={{flex:1}}>
              <TouchableOpacity activeOpacity={.5} >
                <View style={{
                  backgroundColor: "#24a9a6", height: 45, alignItems: "center",
                  justifyContent: "center",borderBottomWidth:2,borderBottomColor:"000"
                }}>
                  <Text style={styles.button}>SIGN UP</Text>
                </View></TouchableOpacity>
</View>

            </View>
        
        
         <View style={{alignItems: "center", marginTop:20}}>
         <TextInput
              placeholder='Email Id'
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={value => this.setState({ useremail: value.trim() })}
           
            />
            <TextInput ref='Password' 
            placeholder='Password'
             secureTextEntry style={styles.input}
              underlineColorAndroid='transparent' 
              onChangeText={value => this.setState({ userpassword: value.trim() })} />

              <TextInput
              placeholder='Full Name'
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={value => this.setState({ username: value.trim() })}
           
            />

         {/* <Text style = {styles.button1}>
          Forgot password ?
            </Text> */}   
           
         <TouchableOpacity 
         style={{borderRadius:20,backgroundColor:'#ff886b',margin:20}}
          onPress={() => this.post_data()}>
            <Text style = {styles.button}>
       Sign Up
            </Text>
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
  input: {
    marginTop: 15,
    height:40,
    width: width - 25,
      paddingLeft:5,
      borderBottomWidth: 1,
      borderBottomColor: '#24a9a6',
    
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

});

