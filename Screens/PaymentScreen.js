
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,ToastAndroid, TextInput,AsyncStorage, Dimensions, TouchableOpacity, ScrollView, Slider } from 'react-native';
import { Row } from 'native-base';
import RadioButton from 'radio-button-react-native';
//import Toast from 'react-native-simple-toast';
var { width, height } = Dimensions.get('window');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
//var StripeNative = require('react-native-stripe');
var stripe = require('stripe-client')('pk_test_sOZdpO4w1dL2szaoMOuHpf00');
 


export default class PaymentScreen extends Component {
    constructor() {
        super();
        this.state = {
            cardnumber: 0,
            cardexpmnth: 0,
            cardexpyear: 0,
            cvc: '',
            amount: '',
            tokenstripe:'',
            striperesponse:'',
            fullname:'',
            emailid:'',
            uid:''

        }
    }
    componentWillMount() {


        AsyncStorage.getItem('id').then((value) => {
          console.log('username===========' + value);
          this.setState({
            uid: value,
          });
          this.getprofileData();
        });
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
                if(responseJson.image_url==''){
                  this.setState({ fullname: responseJson.first_name,city: responseJson.city ,
                    emailid:responseJson.email,country:responseJson.country,state:responseJson.state,
                    phone:responseJson.phone,postcode:responseJson.post_code,address:responseJson.address
                  });
                }else{
                   this.setState({ fullname: responseJson.first_name,city: responseJson.city ,
                  emailid:responseJson.email,ImageDisplay:responseJson.image_url,country:responseJson.country,state:responseJson.state,
                  phone:responseJson.phone,postcode:responseJson.post_code,address:responseJson.address
                });
                }

            console.log('==========message===========' + responseJson.first_name)       
              })
          })
       
          .catch((error) => { console.error(error); });
      }


    async onPayment() {
        var information = {
            card: {
              number: this.state.cardnumber,
              exp_month: this.state.cardexpmnth,  
             
            },  
           
          }
        var card = await stripe.createToken(information);
        var token = card.id;
        this.setState({tokenstripe:token})
        console.log("token id-------"+card.id)
       this.stripebackend();
       // console.log("charge===token id-------"+bank.id)
      }
      stripebackend()
  
      {
        console.log("uid======="+this.state.uid)
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        let options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST'
        };

            var params1 = {
            stripeToken: this.state.tokenstripe,
            product_id: params.pid,
            product_name: params.title,
            price: params.price,

           
        };
        options.body = new FormData();

        for (var k in params1) {
            options.body.append(k, params1[k]);
        }

    

        var passUrl = "https://seoteam.website/api/api.php?method=stripe";
        console.log("======edit_products=============" + passUrl);
        return fetch(passUrl, options)
            .then(response => {
                return response.json()
                    .then(responseJson => {
             
               
                    this.setState({ striperesponse: responseJson.status});
                    console.log('==========edit_productsmessage===========' +this.state.striperesponse)
                    ToastAndroid.show("Payment "+this.state.striperesponse,ToastAndroid.LONG);
                    navigate('Homescreenpage');
                
              
                })
            })
            .catch((err) => { console.log("==========error==========" + err); })
    }

    // var cardDetails = {
    //     "card[number]": "4242424242424242",
    //     "card[exp_month]": "09",
    //     "card[exp_year]": "2023",
    //     "card[cvc]": "123"
    //   };
  
    //   var formBody = [];
    //   for (var property in cardDetails) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(cardDetails[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    //   }
    //   formBody = formBody.join("&");
  
    //   return fetch('https://api.stripe.com/v1/tokens', {
    //       method: 'post',
    //       headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       'Authorization': 'Bearer ' + '<My_Secret_key>'
    //     },
    //     body: formBody
    //   });



    // payment()
    // //   {  fetch('https://api.stripe.com/v1/tokens?card[number]='+this.state.cardnumber+'&card[exp_month]='+this.state.cardexpmnth+'&card[exp_year]='+this.state.cardexpyear+'&card[cvc]='+this.state.cvc+'&amount='+this.state.amount+'&currency=cad', 
    // {
    //     fetch('https://api.stripe.com/v1/tokens?card[number]=4242424242424242&card[exp_month]=1&card[exp_year]=2020&card[cvc]=123&amount=999&currency=usd',
    //       {  method: 'POST',
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded",
    //           "Authorization": "Bearer"+"sk_test_bxQewt9dxcMyfF0WBFgI0AQr"
    //         }
    //       })
    //         .then(resp => resp.json())
    //           .then(data => {
    //               console.log("data======="+data)
                
    //               console.log("dataid======="+data.id)
    //             // HERE WE HAVE ACCESS TO THE TOKEN TO SEND IT TO OUR SERVERS
    //             // ALONG WITH INSENSITIVE DATA     
    //             this.pay();   
    //       })
    //     }
    

    }

  pay(tokenid){  
      fetch('https://ourserver.com/payments', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({stripeToken: tokenid})
  })
    .then(resp => resp.json())
      .then(function(response) {
        if(response.paid) {
            console.log("paid=======");
          // DO SOMETHING AFTER PAYMENT CONFIRMATION
            }
          }.bind(this)).catch(err => console.error(err));


        }         




    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#fcfefb', }}>
                {/* <TouchableOpacity
                    style={{ width: width-20,borderRadius: 5,marginTop:5, marginLeft: 5,height:40,justifyContent:'center' }}
                    onPress={() => navigate('Homescreenpage')}>
                    <Image source={require('../images/cancel.png')} style={{ marginLeft: 8, height: 20, width: 20 }} />
                </TouchableOpacity> */}

                <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../images/boost_star.png')} style={{ resizeMode: "stretch", height: 30, width: 30 }} />
                    <Text style={{ color: '#d14c43', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}> Boost Your Product for {params.days} </Text>
                </View>
                <Text style={{ color: '#d14c43',alignSelf:'center', fontSize: 25,fontWeight: 'bold' }}> ${params.price} </Text>
                
                <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
                <View style={{justifyContent:'center',marginLeft:15,flex:0.4}}>
                <View style={{marginTop:25}}></View>
                <Text style={{color:'#000',fontSize:15}}>FULL NAME</Text></View>
           
                <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
                <View style={{justifyContent:'center',marginLeft:15,flex:0.4}}>
                <View style={{marginTop:25}}></View>
                <Text style={{color:'#000',fontSize:15}}>Email Id</Text></View>
                <TextInput
                  placeholder=''
                  style={styles.input}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                  value={this.state.emailid}
                  onChangeText={value => this.setState({ emailid: value })}
                 />
                </View>
                <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
                <View style={{justifyContent:'center',marginLeft:15,flex:0.4}}>
                <View style={{marginTop:25}}></View>
                <Text style={{color:'#000',fontSize:15}}>PHONE NUMBER</Text></View>
                <TextInput
                 placeholder=''
                  style={styles.input}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                  //onChangeText={value => this.setState({ posttitle: value })}
                 />
                </View>
                <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
                <View style={{justifyContent:'center',marginLeft:15,flex:0.4}}>
                <View style={{marginTop:25}}></View>
                <Text style={{color:'#000',fontSize:15}}>ZIP</Text></View>
                <TextInput 
                 placeholder=''
                  style={styles.input}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                  //onChangeText={value => this.setState({ posttitle: value })}
                 />
                </View>
                <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
                <View style={{justifyContent:'center',marginLeft:15,flex:0.4}}>
                <View style={{marginTop:25}}></View>
                <Text style={{color:'#000',fontSize:15}}>CITY</Text></View>
                <TextInput
                 placeholder=''
                  style={styles.input}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                  //onChangeText={value => this.setState({ posttitle: value })}
                 />
                </View>
                <View style={{height:2,marginTop:35,backgroundColor:'#d14c43',marginLeft:10,width:width-20}}></View>
                
                <View style={{flexDirection:'row',marginTop:25,marginLeft:35,alignItems:'center'}}>
                <Text style={{color:'#000',fontWeight:'bold',marginRight:10}}>CREDIT CARD</Text>
                <TextInput
                 placeholder=''
                  style={styles.input1}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                onChangeText={value => this.setState({ cardnumber: value })}
                 />
                </View>

                <View style={{flexDirection:'row',marginTop:25,marginLeft:35}}>
                <Text style={{color:'#000',fontWeight:'bold',marginRight:10}}>MM</Text>
                <TextInput
                 placeholder=''
                  style={styles.input2}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                  onChangeText={value => this.setState({ cardexpmnth: value })}
                 />

              <Text style={{color:'#000',fontWeight:'bold',marginRight:10,marginLeft:15   }}>yy</Text>
                <TextInput
                 placeholder=''
                  style={styles.input2}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                  onChangeText={value => this.setState({ cardexpyear: value })}
                 />
                </View>


                 <View style={{flexDirection:'row',marginLeft:35,marginTop:20}}>
                <Text style={{color:'#000',fontWeight:'bold',marginRight:10}}>CVC</Text>
                <TextInput
                 placeholder=''
                  style={styles.input2}
                  autoCapitalize="sentences"
                  underlineColorAndroid='transparent'
                  onChangeText={value => this.setState({ cvc: value })}
                 />
                 </View>
               
                
              
                
          
                
                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <TouchableOpacity
                        style={{ alignSelf: "center", width: width, backgroundColor: '#d14c43' }}
                        onPress={() => this.onPayment()}>
                        <Text style={{
                            color: '#fff',
                            padding: 5,
                            margin: 10, fontSize: 18,
                            fontWeight: "bold", alignSelf: "center"
                        }}>C O N F I R M</Text>
                    </TouchableOpacity>
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
        fontWeight: "bold",
        marginTop: 15,
        marginLeft: 15,
        textAlign: "left"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        height: 35,
       // width: width/1.5,
        flex:0.6,
        marginRight:20,
        // paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
     },
     input1: {
        height: 25,
        width: width/2,
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
      input2: { 
        height: 25,
        width: width/5,
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

// import React, { Component } from 'react';
// import { Platform, StyleSheet, ToastAndroid, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, Slider } from 'react-native';
// import { Row } from 'native-base';
// import RadioButton from 'radio-button-react-native';
// // import ToastAndroid from 'react-native-simple-ToastAndroid';
// var { width, height } = Dimensions.get('window');
// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//     android:
//         'Double tap R on your keyboard to reload,\n' +
//         'Shake or press menu button for dev menu',
// });


// export default class PaymentScreen extends Component {
//     constructor() {
//         super();
//         this.state = {
//             SliderValuedistance: 0,
//             SliderValue1: 0,
//             value: 0,
//             location: '',
//             sort: ''
//         }
//     }




//     render() {
//         const { navigate } = this.props.navigation;
//         const { params } = this.props.navigation.state;
//         return (
//             <View style={{ flex: 1, backgroundColor: '#fcfefb', }}>
//                 {/* <TouchableOpacity
//                     style={{ width: width-20,borderRadius: 5, marginLeft: 5,height:40,justifyContent:'center' }}
//                     onPress={() => navigate('Homescreenpage')}>
//                     <Image source={require('../images/cancel.png')} style={{ marginLeft: 8, height: 20, width: 20 }} />
//                 </TouchableOpacity> */}

//                 <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
//                     <Image source={require('../images/boost_star.png')} style={{ resizeMode: "stretch", height: 30, width: 30 }} />
//                     <Text style={{ color: '#d14c43', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}> Boost Your Product for {params.days}</Text>
//                 </View>
//                 <Text style={{ color: '#d14c43',alignSelf:'center', fontSize: 25,fontWeight: 'bold' }}> ${params.price} </Text>
                
//                 <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
//                 <View style={{justifyContent:'center',alignItems:'center',flex:0.4}}>
//                 <Text style={{color:'#000',fontSize:15}}>FULL NAME</Text></View>
//                 <TextInput
//                   placeholder=''
//                   style={styles.input}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />
//                 </View>
//                 <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
//                 <View style={{justifyContent:'center',alignItems:'center',flex:0.4}}>
//                 <Text style={{color:'#000',fontSize:15}}>ADDRESS</Text></View>
//                 <TextInput
//                   placeholder=''
//                   style={styles.input}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />
//                 </View>
//                 <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
//                 <View style={{justifyContent:'center',alignItems:'center',flex:0.4}}>
//                 <Text style={{color:'#000',fontSize:15}}>PHONE NUMBER</Text></View>
//                 <TextInput
//                  placeholder=''
//                   style={styles.input}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />
//                 </View>
//                 <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
//                 <View style={{justifyContent:'center',alignItems:'center',flex:0.4}}>
//                 <Text style={{color:'#000',fontSize:15}}>ZIP</Text></View>
//                 <TextInput
//                  placeholder=''
//                   style={styles.input}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />
//                 </View>
//                 <View style={{flexDirection:'row',flex:0.10,marginTop:10}}>
//                 <View style={{justifyContent:'center',alignItems:'center',flex:0.4}}>
//                 <Text style={{color:'#000',fontSize:15}}>CITY</Text></View>
//                 <TextInput
//                  placeholder=''
//                   style={styles.input}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />
//                 </View>
//                 <View style={{height:2,marginTop:35,backgroundColor:'#d14c43',marginLeft:10,width:width-20}}></View>
                
//                 <View style={{flexDirection:'row',marginTop:25,justifyContent:'center',alignItems:'center'}}>
//                 <Text style={{color:'#000',fontWeight:'bold',marginRight:10}}>CREDIT CARD</Text>
//                 <TextInput
//                  placeholder=''
//                   style={styles.input1}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />
//                 </View>

//                 <View style={{flexDirection:'row',marginTop:25,justifyContent:'center',alignItems:'center'}}>
//                 <Text style={{color:'#000',fontWeight:'bold',marginRight:10}}>MM/YY</Text>
//                 <TextInput
//                  placeholder=''
//                   style={styles.input2}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />

//               <Text style={{color:'#000',fontWeight:'bold',marginRight:10,marginLeft:15   }}>CVC</Text>
//                 <TextInput
//                  placeholder=''
//                   style={styles.input2}
//                   autoCapitalize="sentences"
//                   underlineColorAndroid='transparent'
//                   //onChangeText={value => this.setState({ posttitle: value })}
//                  />
//                 </View>

          
                
//                 <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
//                     <TouchableOpacity
//                         style={{ alignSelf: "center", width: width, backgroundColor: '#d14c43' }}>
//                         <Text style={{
//                             color: '#fff',
//                             padding: 5,
//                             margin: 10, fontSize: 18,
//                             fontWeight: "bold", alignSelf: "center"
//                         }}>C O N F I R M</Text>
//                     </TouchableOpacity>
//                 </View>

//             </View>

//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fcfefb',

//     },
//     welcome: {
//         fontSize: 16,
//         fontWeight: "bold",
//         marginTop: 15,
//         marginLeft: 15,
//         textAlign: "left"
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
//     input: {
//         height: 35,
//        // width: width/1.5,
//         flex:0.6,
//         marginRight:20,
//         // paddingLeft: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#000',
//      },
//      input1: {
//         height: 25,
//         width: width/2,
//         borderWidth: 2,
//         borderRadius: 2,
//         padding: 5,
//         shadowColor: '#000000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//         elevation: 0.5,
//         borderColor: '#e6e6e6'
//       },
//       input2: { 
//         height: 25,
//         width: width/5,
//         borderWidth: 2,
//         borderRadius: 2,
//         padding: 5,
//         shadowColor: '#000000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.2,
//         shadowRadius: 2,
//         elevation: 0.5,
//         borderColor: '#e6e6e6'
//       },
// });
