import React, { Component } from 'react';
import {StatusBar,
  Platform,BackHandler,
  StyleSheet,ToastAndroid,
  Text,ScrollView,PixelRatio,TouchableOpacity,
  View,Image,Dimensions,AsyncStorage,TextInput
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var {height, width} = Dimensions.get('window');
export default class profile extends Component {
  state = {
    
    
    ImageSource: null,
  };
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}


componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}
selectPhotoTapped() {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
  };

  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled photo picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({

        ImageSource: source

      });
    }
  });
}

              
 render() {
    return (
      <ScrollView style={{backgroundColor:"#fff", }}>
        <View style={{flex:1,alignItems:"center" , marginTop:40}}>
       <View style={{flexDirection:"row"}}> 
       <View style={styles.ImageContainer}>

{ this.state.ImageSource === null ? <Text>Select a Photo</Text> :
  <Image style={styles.ImageContainer} source={this.state.ImageSource} />
}

</View>

 <View style={{marginLeft:20,alignItems:"flex-end",justifyContent:"flex-end"}}>
        <TouchableOpacity   onPress={this.selectPhotoTapped.bind(this)}>
        <Image source={require('../images/camera.png')} style={{alignSelf:"flex-end",height:50,width:50}}/>
        </TouchableOpacity>
        </View>
    </View>
    <TextInput
              placeholder='Enter Name'
              style={styles.input}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.onSubmitHandler()}
              returnKeyType={'next'}
           
            />
            <TextInput 
            placeholder='Enter Email'
             secureTextEntry style={styles.input}
             onSubmitEditing={() => this.onSubmitHandler()}
              underlineColorAndroid='transparent' 
              returnKeyType={'next'} />

               <TextInput 
            placeholder='Enter Country'     
             secureTextEntry style={styles.input}
              underlineColorAndroid='transparent' 
              onSubmitEditing={() => this.onSubmitHandler()}
              returnKeyType={'next'}
              />
    <TextInput
              placeholder='Enter State'
              style={styles.input}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.onSubmitHandler()}
              returnKeyType={'next'}
           
            />
            <TextInput
            placeholder='Enter City'
             secureTextEntry style={styles.input}
              underlineColorAndroid='transparent' 
            />

               <TextInput 
            placeholder='Full Name'     
             secureTextEntry style={styles.input}
              underlineColorAndroid='transparent' 
              onSubmitEditing={() => this.onSubmitHandler()}
            />
              <TextInput
            placeholder='Enter City'
             secureTextEntry style={styles.input}
              underlineColorAndroid='transparent' 
              onSubmitEditing={() => this.onSubmitHandler()}
              />

               <TextInput 
            placeholder='Full Name'     
             secureTextEntry style={styles.input}
              underlineColorAndroid='transparent' 
              onSubmitEditing={() => this.onSubmitHandler()}
             />
   </View>
   

      <TouchableOpacity 
         style={{alignSelf:"center",width:150,borderRadius:20,backgroundColor:'#66CECC',margin:10}}
          onPress={() => navigate('')}>
            <Text style = {{  color:'#fff',
    padding:5,
    margin:10,
    fontWeight:"bold",alignSelf:"center"}}>SAVE</Text>
         </TouchableOpacity>
          </ScrollView>
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
   ImageContainer: {
    marginLeft:40,
    borderRadius: 10,
    width: 160,
    height: 160,
    borderColor: '#000',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfefb',

    
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#F88B88",
    paddingVertical: 15,
    marginTop: 45,
    width: 160,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:30
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15
  },input: {
    marginTop: 15,
    height:35,
    width:width-20,
    borderWidth:2,
    borderRadius:2,
    padding:5,
    shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.5,
    borderColor:'#e6e6e6'
  },
  
});
