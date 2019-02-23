import React, { Component } from "react";
import { Image, TouchableOpacity, AsyncStorage, Dimensions,ScrollView,TouchableNativeFeedback } from "react-native";
import {
    Content, Text, List, ListItem, Icon, Container, Left,
    Right, Badge, Button, View, StyleProvider, getTheme,
    variables,

} from "native-base";

import { DrawerNavigator } from 'react-navigation';
import styles from "./style";


const deviceHeight = Dimensions
    .get("window")
    .height;
const deviceWidth = Dimensions
    .get("window")
    .width;
 
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            userPic: null,
            username: null,
            email: null,
           
            uId:null,            
        };
    }

    gotoPages(route,props) {this.props.route(route,props)}
   
 
 
  
    render() {
        // const { params } = this.props.navigation.state;
 
        return (
            
             <View style={{flex: 1,backgroundColor: "#fcfefb",top: -1}}>
               <View style={styles.drawerCover}>                                
                 <View style={{height: deviceHeight / 6.4,backgroundColor: "#66CECC"    }} />
              
               <Image source={require('../images/facebookicon.png')}    style={{position: 'absolute',marginLeft: 20,marginTop: 15,height: 70,width: 70,borderRadius: 55}} />
               {/* <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>{params.user}</Text> */}
                  <View style={{position: 'absolute',marginTop: 8}}>
                           
                        </View>
                    </View>

            <ScrollView style={{flex: 1,backgroundColor: '#fcfefb'}}>

                <TouchableOpacity style={{flexDirection:"row"}} activeOpacity={.5} onPress={() => this.props.closeDrawer()}>
                <Image source={require('../images/home.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.gotoPages('')}>
                <Image source={require('../images/imagegallery.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>Self your Stuff</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.gotoPages('')}>
                <Image source={require('../images/chat.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.gotoPages('')}>
                <Image source={require('../images/alarm.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.gotoPages('Profilepage')}>
                <Image source={require('../images/user.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>My profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.gotoPages('Helppage')}>
                <Image source={require('../images/help.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>Help</Text>
                </TouchableOpacity>
               
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.gotoPages('')}>
                <Image source={require('../images/login.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.gotoPages('')}>
                <Image source={require('../images/logout.png')}    style={{margin: 15,height: 30,width: 30}} />
                    <Text style={{color: "#000",marginTop: 20,fontSize: 15,textAlign: 'left'}}>Sign Out</Text>
                </TouchableOpacity>
                
                </ScrollView>
                </View>
            
        );
    }
}

export default Sidebar;
