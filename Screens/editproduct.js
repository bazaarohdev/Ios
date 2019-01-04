import React, { Component } from 'react';
import {StatusBar,
  Platform,BackHandler,
  StyleSheet,ToastAndroid,
  Text,ScrollView,PixelRatio,TouchableOpacity,
  View,Image,Dimensions,AsyncStorage,TextInput
} from 'react-native';
import Toast from 'react-native-simple-toast'; 
import ImagePicker from 'react-native-image-picker';
import RadioButton from 'radio-button-react-native';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var {height, width} = Dimensions.get('window');
export default class editproduct extends Component {
  
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
      value: 0,
      posttype:'',
      classieraadstype:'',
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
handleOnPress(value) {
    this.setState({ value: value })
  }
post_data(){ 
          
  const { navigate } = this.props.navigation;
  const { params } = this.props.navigation.state;
 
  var params1 = {
    post_id:params.product_id,
   
    classiera_ads_type:this.state.classieraadstype
};

var formData = new FormData();

for (var k in params1) {
    formData.append(k, params1[k]);
}

var passUrl = "https://seoteam.website/api/api.php?method=edit_products";
console.log("======edit_products============="+ passUrl);
fetch(passUrl, {
  method: 'POST',
  headers: {              
           'Content-Type': 'application/formData'
           },
  body: formData })
.then((response) =>(response.json())) 
.then((responseJson) =>{
 
  this.setState({ data: responseJson.message });   
  this.post_dataimage();
  console.log('==========edit_productsmessage===========' + this.state.data)       
  Toast.show(this.state.data,Toast.SHORT);
// if (this.state.data ='Account created')
// {
// navigate("logintabspage")
// }
// else
// {
// Toast.show("Enter correct detials..."+this.state.data,Toast.SHORT);
// }
navigate('Homescreenpage');
})    
.catch((err) => { console.log("==========error==========" + err); })
} 


post_dataimage(){ 
          
  const { navigate } = this.props.navigation;
  const { params } = this.props.navigation.state;
 
  var params2 = {
    upload_attachment:this.state.ImageSource,
    post_id:params.product_id,
  
};

var formData = new FormData();

for (var k in params2) {
    formData.append(k, params2[k]);
}

var passUrl = "https://seoteam.website/api/api.php?method=image_update";
console.log("======image_update============="+ passUrl);
fetch(passUrl, {
  method: 'POST',
  headers: {              
           'Content-Type': 'application/formData'
           },
  body: formData })
.then((response) =>(response.json())) 
.then((responseJson) =>{
 
  this.setState({ data: responseJson.message });   
  console.log('==========image_updatesmessage===========' + this.state.data)       
  Toast.show(this.state.data,Toast.SHORT);
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
      {/* <View style={{alignSelf:"center",height:2,width:width-25,backgroundColor:"#66CECC", marginTop:5}}></View> */}
        <View style={{flex:1, marginTop:15}}>
        <Text style={{fontWeight:"bold",margin:5,marginLeft:15,fontSize:16}}> Photos </Text>
       <View style={{flexDirection:"row",alignItems:"flex-start"}}> 
       <View style={styles.ImageContainer1}></View>
       <TouchableOpacity   onPress={this.selectPhotoTapped.bind(this)}>
         <View style={styles.ImageContainer}>

{ this.state.ImageSource === null ? <View><Text style={{fontWeight:"bold"}}> + Add more </Text> 
<Text style={{alignSelf:"center",fontWeight:"bold"}}> Photos </Text></View>:
  <Image style={styles.ImageContainer} source={this.state.ImageSource} />
}

</View></TouchableOpacity>

  
      
    </View>
    <View style={{alignItems:"center",marginTop:15}}>
    <Text   style={styles.text}>Product Title </Text>
    <TextInput
              placeholder='What are you selling ? (Optional)'
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={value => this.setState({ posttitle: value.trim() })}
           
            />
            <Text style={styles.text}>Description </Text>
    <TextInput
              placeholder='Describe your product'
              style={styles.input}
              underlineColorAndroid='transparent'
              onChangeText={value => this.setState({ postcontent: value.trim() })}
           
            />
             <Text style={styles.text}>Category</Text>
    <TextInput
              placeholder='Select Category'
              style={{ height:35,
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
              onChangeText={value => this.setState({ classieraMainCat: value.trim() })}
           
            />
           
            <Text style={styles.text}>Price(in USD) </Text>
            <TextInput 
            placeholder='CAD'
              style={styles.input}
             
             onChangeText={value => this.setState({ posttags: value.trim() })} />
 <Text style={styles.text}>Type</Text>
           <View style={{ flexDirection: "row", margin: 5,marginLeft:15,alignSelf:"flex-start" }}>
          <RadioButton style={{
            marginTop: 15,
            marginLeft: 15, borderColor: '#66CECC'
          }} currentValue={this.state.value} value={0} onPress={this.handleOnPress.bind(this)}>

            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft:10,marginRight:50
            }}>Buy</Text>
          </RadioButton>


          <RadioButton style={{
            marginTop: 15,
            marginLeft: 15, borderColor: '#66CECC'
          }} currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",marginLeft:10
            }}>Rent</Text>
          </RadioButton>


  
        </View>
              
        </View>   
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
    marginLeft:15,
   // borderRadius: 10,
    width: 100,
    height: 100,
    borderColor: '#66CECC',
    borderWidth: 4 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#fcfefb',

    
  },
  ImageContainer1: {
    marginLeft:15,
    //borderRadius: 10,
    width: 100,
    height: 100,
    borderColor: '#66CECC',
    borderWidth: 4 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66CECC',

    
  },
text:
{
  alignSelf:"flex-start",
marginTop:15,
marginLeft:10,
marginBottom:5,
fontWeight:"bold"

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
