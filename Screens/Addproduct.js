import React, { Component } from 'react';
import {StatusBar,
  Platform,BackHandler,
  StyleSheet,ToastAndroid,
  Text,ScrollView,PixelRatio,TouchableOpacity,
  View,Image,Dimensions,AsyncStorage,TextInput
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var {height, width} = Dimensions.get('window');
export default class Addproduct extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      ImageSource: null,
      posttitle:'',
      postcontent:'',
      posttags:'',
      classieramaincatfield:'',
      postlocation:'',
      isLoading: true
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}


componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}

post_data(){ 
          
  const { navigate } = this.props.navigation;
  var params = {
    postTitle:this.state.posttitle,
    postContent: this.state.postcontent,
    'classiera-main-cat-field':this.state.classieramaincatfield,
    post_tags:this.state.posttags,
    post_location :this.state.postlocation
};

var formData = new FormData();

for (var k in params) {
    formData.append(k, params[k]);
}

var passUrl = "https://seoteam.website/api/api.php?method=sell_now";
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
// if (this.state.data ='Account created')
// {
// navigate("logintabspage")
// }
// else
// {
// Toast.show("Enter correct detials..."+this.state.data,Toast.SHORT);
// }

})    
.catch((err) => { console.log("==========error==========" + err); })
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
              placeholder='Select Category'
              style={{ marginTop:15,height:35,
                width:width-20,
                borderWidth:2,
                borderRadius:2,
                padding:5,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 0.5,
                borderColor:'#e6e6e6'}}
              underlineColorAndroid='transparent'
              onChangeText={value => this.setState({ classieramaincatfield: value.trim() })}
           
            />
            <Text   style={styles.text}>Ad Title :</Text>
    <TextInput
              placeholder='Enter Trial'
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={value => this.setState({ posttitle: value.trim() })}
           
            />
            <Text style={styles.text}>Price(in USD) :</Text>
            <TextInput 
            placeholder='Enter Price'
              style={styles.input}
             
             onChangeText={value => this.setState({ posttags: value.trim() })} />

            <Text style={styles.text}>Address :</Text>
               <TextInput 
            placeholder='Enter Address'     
              style={styles.input}
              underlineColorAndroid='transparent' 
              onChangeText={value => this.setState({ postlocation: value.trim() })}
              />
              <Text style={styles.text}>Description :</Text>
    <TextInput
              placeholder='Enter description'
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={value => this.setState({ postcontent: value.trim() })}
           
            />
           
   </View>
   

      <TouchableOpacity 
         style={{alignSelf:"center",width:150,borderRadius:20,backgroundColor:'#66CECC',marginTop:20,margin:10}}
          onPress={() => this.post_data()}>
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
text:
{
  alignSelf:"flex-start",
marginTop:10,
marginLeft:10,
marginBottom:4

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
    
    height:35,
    width:width-20,
    borderWidth:2,
    borderRadius:2,
    padding:5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.5,
    borderColor:'#e6e6e6'
  },
  
});
