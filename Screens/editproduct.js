import React, { Component } from 'react';
import {
    StatusBar,
    Platform, BackHandler,
    StyleSheet, ToastAndroid, FlatList,
    Text, ScrollView, PixelRatio, TouchableOpacity,
    View, Image, Dimensions, AsyncStorage, TextInput, WebView
} from 'react-native';
// import ToastAndroid from 'react-native-simple-ToastAndroid';
import ImagePicker from 'react-native-image-picker';
import RadioButton from 'radio-button-react-native';
import Modal from 'react-native-modal';
import { Left, Right } from 'native-base';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
var { height, width } = Dimensions.get('window');
export default class editproduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ImageSource: '',
            posttitle: '',
            ImageDisplay: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-EEhlOPI8EgWJsU7NDWt1vRf2T_CypsqE1M2Mm3MBVDYJUW5',
            postcontent: '',
            posttags: '',
            classieramaincatfield: 'Select Category',
            datacategory: [],
            postlocation: '',
            value: 0,
            Images: '',
            valueNE: 0,
            valuedays: 0,
            posttype: '',
            classieraadstype: '',
            isLoading: true
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        const { navigate } = this.props.navigation;     
        // this.props.navigation.goBack(null);
        // return true;
        navigate("Homescreenpage")    
        return true;
    }
   
    handleOnPressdays(value) {
        const { navigate } = this.props.navigation;
        this.setState({ valuedays: value })
        // console.log("========radio button value check =====" + this.state.valuedays)
        this.nextscreenMethod(value);
       
        
    }

    nextscreenMethod(value){

        console.log("========radio next screen value check =====" + value)
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        if(value == 1){
            navigate('PaymentScreenpage',{price:5,days:"1 Day",pid:params.product_id,title:this.state.posttitle})
            }
            else if(value == 2){
            navigate('PaymentScreenpage',{price:10,days:"2 Days",pid:params.product_id,title:this.state.posttitle})
            }
            else if(value == 3){
            navigate('PaymentScreenpage',{price:15,days:'3 Days',pid:params.product_id,title:this.state.posttitle})
            }
            else if(value == 4){
            navigate('PaymentScreenpage',{price:20,days:"4 Days",pid:params.product_id,title:this.state.posttitle})
            }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({ ImageSource: params.Image })
        this.getproductpreviousdetials();
        this.getData();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    post_data() {
        console.log('==========edit_productsmestrsage===========')
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        var typevalue =0
        if(this.state.value ==1 ){
          typevalue = 0
        }else if(this.state.value ==2){
          typevalue = 1
        }

        let options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST'
        };

        var params1 = {
            post_id: params.product_id,
            postTitle: this.state.posttitle,
            postContent: this.state.postcontent,
            classieraMainCat: this.state.classieramaincatfield,
            post_category_type: this.state.posttags,
            post_location: this.state.postlocation,
            buyorrent:this.state.value
        };

        options.body = new FormData();

        for (var k in params1) {
            options.body.append(k, params1[k]);
        }

        var passUrl = "https://seoteam.website/api/api.php?method=edit_products";
        console.log("======edit_products=============" + passUrl);

        return fetch(passUrl, options)
            .then(response => {
                return response.json()
                    .then(responseJson => {

                        this.setState({ data: responseJson.message });
                        console.log('==========edit_productsmessage===========' + this.state.data)
                        if(this.state.ImageSource == params.Image){
                            navigate('productviewpage', { product_id: params.product_id })
                        }else{
                            this.post_dataimage();
                        }
                    
                    })
            })
            .catch((err) => { console.log("==========error==========" + err); })
    }


    post_dataimage() {

        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        let options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST'
        };

        var params2 = {
            //upload_attachment: this.state.ImageSource,
            post_id: params.product_id,
      
          };

        options.body = new FormData();
        

        for (var k in params2) {
            options.body.append(k, params2[k]);
            options.body.append('upload_attachment', {
                uri: 'file://' + this.state.ImageSource,
                name: 'image.jpg',
                type: `image/jpg`
            });
            
        }

        var passUrl = "https://seoteam.website/api/api.php?method=image_update";
        console.log("======image_update=============" + passUrl);
        console.log("======image_updatesource=============" + this.state.ImageSource);

        return fetch(passUrl, options)
            .then(response => {
                return response.json()
                    .then(responseJson => {

                        this.setState({ data: responseJson.message });
                        console.log('==========image_updatesmessage===========' + this.state.data)
                        ToastAndroid.show("Updated post successfully", ToastAndroid.SHORT);
                        navigate('productviewpage', { product_id: params.product_id })
                    })
            })
            .catch((err) => { console.log("==========ImageSourceerror==========" + err); })
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
                var source = response.path
                let imagedisplay = { uri: response.uri }
                console.log('dfhbdgn================ ', response.uri);
               
                this.setState({
                    ImageSource: source, ImageDisplay: imagedisplay

                });
            }
        });
    }
    getData() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;

        var passUrl = 'https://seoteam.website/api/api.php?method=cat'
        console.log('*****************catlist********************' + passUrl);
        return fetch(passUrl)

            .then((response) => response.json())

            .then((responseJson) => {
                //  console.log('==========datares===========' + responseJson.leadscount)
                this.setState({
                    datacategory: responseJson.catlist,
                    isLoading: false
                });
                console.log('==========catlistdata===========' + this.state.data)

            })
            .catch((error) => { console.error(error); });
    }
    _renderCategory = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={{ fontSize: 20, color: '#000000', fontWeight: 'bold' }}>Product</Text>
                <FlatList
                    style={{ marginTop: 10, }}
                    data={this.state.datacategory}
                    showsVerticalScrollIndicator={false}
                    renderItem={this._renderItemcategory}
                    keyExtractor={this._keyExtractor} />
            </View>
        )
    }

    _renderItemcategory = (itemData) => {
        console.log("renderitemvalue============" + itemData.item.Sources)
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.setState({ category_visibility: false, classieramaincatfield: itemData.item.catname })}>
                <Text style={{ fontSize: 20, marginTop: 15, marginLeft: 12 }}>{itemData.item.catname}</Text>
                {/* <View style={{borderWidth:1,width:null,height:null}}></View> */}
            </TouchableOpacity>
        );
    }


    getproductpreviousdetials() {
        const { params } = this.props.navigation.state;
        this.setState({
            posttitle: params.Title,
            postcontent: params.description,
            posttags: params.price,
            postlocation: params.location,
            Images: params.Image,
            classieramaincatfield: params.category,
        })
    }

    buyOrRent() {
        if (this.state.classieramaincatfield == 'Bridal') {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ alignSelf: "flex-start", marginTop: 15, marginLeft: 10, marginBottom: 5, fontWeight: "bold", fontSize: 15 }}>Type</Text>
                        <View style={{ flexDirection: "row", margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>

                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginLeft: 10, marginRight: 50
                                }}>Buy</Text>
                            </RadioButton>

                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={2} onPress={this.handleOnPress.bind(this)}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold", marginLeft: 10
                                }}>Rent</Text>
                            </RadioButton>

                        </View>
                    </View>
                    <View style={{ margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                        <TextInput
                            placeholder='Rental Price per Day'
                            style={{
                                marginTop: 23,
                                height: 40,
                                width: width / 2 - 30,
                                paddingLeft: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#24a9a6',
                            }}
                            autoCapitalize="sentences"
                            underlineColorAndroid='transparent'
                            keyboardType="numeric"
                            onChangeText={value => this.setState({ posttitle: value })}
                        />
                    </View>
                </View>
            )
        }
        else if (this.state.classieramaincatfield == 'Lehnga') {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ alignSelf: "flex-start", marginTop: 15, marginLeft: 10, marginBottom: 5, fontWeight: "bold", fontSize: 15 }}>Type</Text>
                        <View style={{ flexDirection: "row", margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>

                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginLeft: 10, marginRight: 50
                                }}>Buy</Text>
                            </RadioButton>

                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={2} onPress={this.handleOnPress.bind(this)}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold", marginLeft: 10
                                }}>Rent</Text>
                            </RadioButton>

                        </View>
                    </View>
                    <View style={{ margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                        <TextInput
                            placeholder='Rental Price per Day'
                            style={{
                                marginTop: 23,
                                height: 40,
                                width: width / 2 - 30,
                                paddingLeft: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#24a9a6',
                            }}
                            autoCapitalize="sentences"
                            underlineColorAndroid='transparent'
                            keyboardType="numeric"
                            onChangeText={value => this.setState({ posttitle: value })}
                        />
                    </View>
                </View>
            )
        }
        else if (this.state.classieramaincatfield == 'Saris') {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ alignSelf: "flex-start", marginTop: 15, marginLeft: 10, marginBottom: 5, fontWeight: "bold", fontSize: 15 }}>Type</Text>
                        <View style={{ flexDirection: "row", margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>

                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginLeft: 10, marginRight: 50
                                }}>Buy</Text>
                            </RadioButton>

                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={2} onPress={this.handleOnPress.bind(this)}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold", marginLeft: 10
                                }}>Rent</Text>
                            </RadioButton>

                        </View>
                    </View>
                    <View style={{ margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                        <TextInput
                            placeholder='Rental Price per Day'
                            style={{
                                marginTop: 23,
                                height: 40,
                                width: width / 2 - 30,
                                paddingLeft: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#24a9a6',
                            }}
                            autoCapitalize="sentences"
                            underlineColorAndroid='transparent'
                            keyboardType="numeric"
                            onChangeText={value => this.setState({ posttitle: value })}
                        />
                    </View>
                </View>
            )
        }
        else if (this.state.classieramaincatfield == 'Menswear') {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ alignSelf: "flex-start", marginTop: 15, marginLeft: 10, marginBottom: 5, fontWeight: "bold", fontSize: 15 }}>Type</Text>
                        <View style={{ flexDirection: "row", margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={1} onPress={this.handleOnPress.bind(this)}>

                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    marginLeft: 10, marginRight: 50
                                }}>Buy</Text>
                            </RadioButton>

                            <RadioButton style={{
                                marginTop: 15,
                                marginLeft: 15, borderColor: '#66CECC'
                            }} currentValue={this.state.value} value={2} onPress={this.handleOnPress.bind(this)}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold", marginLeft: 10
                                }}>Rent</Text>
                            </RadioButton>

                        </View>
                    </View>
                    <View style={{ margin: 5, marginLeft: 15, alignSelf: "flex-start" }}>
                        <TextInput
                            placeholder='Rental Price per Day'
                            style={{
                                marginTop: 23,
                                height: 40,
                                width: width / 2 - 30,
                                paddingLeft: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#24a9a6',
                            }}
                            autoCapitalize="sentences"
                            underlineColorAndroid='transparent'
                            keyboardType="numeric"
                            onChangeText={value => this.setState({ posttitle: value })}
                        />
                    </View>
                </View>
            )
        }
    }

    
    paymentview(){
        const { params } = this.props.navigation.state;
        if(params.boostvalue == 0){
        return(
            <View style={{marginTop: 30, height: 150, width: width - 40, borderRadius: 15, borderWidth: 1, borderColor: "#B22222" }}>
            <View style={{ flexDirection: "row" }}>
            <Image source={require('../images/red_star.png')} style={{ marginLeft: 8, height: 25, width: 25, marginTop: 15, margin: 10 }} />
            <Text style={{ alignSelf: "center", color: "#B22222", fontWeight: "bold", fontSize: 16, marginTop: 15, margin: 10 }}>Boost your product and sell faster</Text>


        </View>

        <View style={{ flex: 4, flexDirection: "row", margin: 5, marginTop: 15, marginLeft: 15, alignSelf: "flex-start" }}>


            <View style={{ flex: 1 }}>
                <RadioButton style={{
                    marginTop: 15,
                    marginLeft: 10, borderColor: '#66CECC'
                }} currentValue={this.state.valuedays} value={1} onPress={this.handleOnPressdays.bind(this)}>

                    <Text style={{
                        marginLeft: 5,
                    }}>1 Days</Text>
                </RadioButton>
            </View>
            <View style={{ flex: 1 }}>
                <RadioButton style={{
                    marginTop: 15,
                    marginLeft: 10, borderColor: '#66CECC'
                }} currentValue={this.state.valuedays} value={2} onPress={this.handleOnPressdays.bind(this)}>
                    <Text style={{

                        marginLeft: 5
                    }}>2 Days</Text>
                </RadioButton>
            </View>
            <View style={{ flex: 1 }}>
                <RadioButton style={{
                    marginTop: 15,
                    marginLeft: 10, borderColor: '#66CECC'
                }} currentValue={this.state.valuedays} value={3} onPress={this.handleOnPressdays.bind(this)}>

                    <Text style={{
                        marginLeft: 5,
                    }}>3 Days</Text>
                </RadioButton>
            </View>
            <View style={{ flex: 1 }}>
                <RadioButton style={{
                    marginTop: 15,
                    marginLeft: 10, borderColor: '#66CECC'
                }} currentValue={this.state.valuedays} value={4} onPress={this.handleOnPressdays.bind(this)}>
                    <Text style={{
                        marginLeft: 5
                    }}>4 Days</Text>
                </RadioButton>
            </View>

        </View>
        <TouchableOpacity
            style={{ alignSelf: "center", width: width - 40, height: 35, backgroundColor: '#B22222', borderRadius: 15, marginTop: 10 }}
            onPress={() => navigate('webviewpage')} >
            <Text style={{
                color: '#fff',
                margin: 10,
                fontWeight: "bold", alignSelf: "center"
            }}>Pay $5 per Day</Text>
        </TouchableOpacity>
        </View>
        )
    }
    else{
        return(
        <View style={{marginTop: 30, height: 50, width: width - 40, borderRadius: 15, borderWidth: 1, borderColor: "#B22222",justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:20}}>This Product is already boosted</Text>
        </View>
        )
    }
}


    render() {
        const { navigate } = this.props.navigation;
        let shouldDisplayListView = false;
        return (
            <View style={{ flex: 1, backgroundColor: '#fcfefb', }}>
                <ScrollView>
                    {/* <View style={{alignSelf:"center",height:2,width:width-25,backgroundColor:"#66CECC", marginTop:5}}></View> */}
                    <View style={{ flex: 1, marginTop: 15, marginBottom: 80 }}>
                        <Text style={{ fontWeight: "bold", margin: 5, marginLeft: 15, fontSize: 16 }}> Photos </Text>
                        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                            <View style={styles.ImageContainer1}>
                                <Image style={{
                                    width: 100,
                                    height: 100,
                                    borderColor: '#66CECC',
                                    borderWidth: 4 / PixelRatio.get(),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fcfefb',
                                }} source={{ uri: this.state.Images }} /></View>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <View style={styles.ImageContainer}>

                                    {this.state.ImageDisplay === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-EEhlOPI8EgWJsU7NDWt1vRf2T_CypsqE1M2Mm3MBVDYJUW5' ? <View><Text style={{ fontWeight: "bold" }}> + Add more </Text>
                                        <Text style={{ alignSelf: "center", fontWeight: "bold", color: "#000" }}> Photos </Text></View> :
                                        <Image style={{
                                            width: 100,
                                            height: 100,
                                            borderColor: '#66CECC',
                                            borderWidth: 4 / PixelRatio.get(),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#fcfefb',
                                        }} source={this.state.ImageDisplay} />
                                    }

                                </View></TouchableOpacity>


                        </View>

                        <View style={{ flex: 1, alignItems: "center", marginTop: 15 }}>
                            <Text style={styles.text}>Product Title </Text>
                            <TextInput
                                placeholder='What are you selling ? (Optional)'
                                style={styles.input}
                                value={this.state.posttitle}
                                autoCapitalize="words"
                                underlineColorAndroid='transparent'
                                onChangeText={value => this.setState({ posttitle: value })}

                            />
                            <Text style={styles.text}>Description </Text>
                            <TextInput
                                placeholder='Describe your product'
                                style={styles.input}
                                autoCapitalize="words"
                                value={this.state.postcontent}
                                underlineColorAndroid='transparent'
                                onChangeText={value => this.setState({ postcontent: value })}

                            />
                            <Text style={styles.text}>Category</Text>
                            <View>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => this.setState({ category_visibility: true })}>
                                    <View
                                        style={{
                                            marginTop: 8,
                                            height: 35,
                                            width: width - 20,
                                            borderWidth: 2,
                                            borderRadius: 2,
                                            padding: 5,
                                            flexDirection: 'row',
                                            elevation: 0.5,
                                            borderColor: '#24a9a6'
                                        }}
                                    >
                                        <Left><Text style={{ color: '#000' }}>{this.state.classieramaincatfield}</Text></Left>
                                        <Right><Image source={require('../images/dropdown.png')} style={{ marginRight: 8, height: 15, width: 15 }}></Image></Right>
                                    </View></TouchableOpacity>
                                <Modal isVisible={this.state.category_visibility == true}>{this._renderCategory()}</Modal></View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <View>
                                    <Text style={{
                                        alignSelf: "flex-start",
                                        marginTop: 15,
                                        marginBottom: 5,
                                        fontWeight: "bold"
                                    }}>Price(in USD) </Text>
                                    <TextInput
                                        placeholder='CAD'
                                        style={{
                                            marginTop: 5,
                                            height: 40,
                                            width: width / 2,
                                            paddingLeft: 5,
                                            marginRight: 50,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#24a9a6',
                                        }}
                                        keyboardType="numeric"
                                        value={this.state.posttags}
                                        onChangeText={value => this.setState({ posttags: value })} />
                                </View>
                                <View style={{ justifyContent: 'center', marginRight: 20 }}>
                                    <RadioButton style={{
                                        marginTop: 55,
                                        marginLeft: 10, borderColor: '#66CECC'
                                    }} currentValue={this.state.valueNE} value={1} onPress={this.handleOnPressNE.bind(this)}>

                                        <Text style={{
                                            marginLeft: 5,
                                        }}>Negotiable</Text>
                                    </RadioButton></View>
                            </View>
                            {/* <Text style={styles.text}>Price(in USD) </Text> */}
                            {/* <TextInput
                                placeholder='CAD'
                                style={styles.input}
                                keyboardType="numeric"
                                value={this.state.posttags}
                                onChangeText={value => this.setState({ posttags: value })} /> */}
                            <View>{this.buyOrRent()}</View>

                            <Text style={styles.text}>City</Text>
                            <GooglePlacesAutocomplete
                                placeholder='Eg. Toronto'
                                minLength={2} // minimum length of text to search
                                autoFocus={false}
                                fetchDetails={true}
                                listViewDisplayed={shouldDisplayListView}
                                onFocus={() => shouldDisplayListView = true}
                                onBlur={() => shouldDisplayListView = false}
                                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                    this.setState({
                                        postlocation: data.description,
                                        maplat: details.geometry.location.lat, maplng: details.geometry.location.lng
                                    })
                                    console.log("====" + details.geometry.location.lat);
                                    console.log(details);
                                }}

                                enablePoweredByContainer={false}
                                getDefaultValue={() => {
                                    return ''; // text input default value
                                }}
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyC773YUQA2tzQDqkoNOT0SsAOlLh6zqMZI',
                                    language: 'en', // language of the results
                                    types: '(cities)', // default: 'geocode'
                                }}
                                styles={{
                                    description: {
                                        fontWeight: 'bold',
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                    backgroundColor: "#F88B88",
                                    paddingVertical: 15,
                                    marginTop: 45,
                                    width: 160,
                                    height: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 30
                                }}

                                // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                                // currentLocationLabel="Current location"
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                    rankby: 'distance',
                                    types: 'food',
                                }}


                                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                            // predefinedPlaces={[homePlace, workPlace]}

                            // predefinedPlacesAlwaysVisible={true}
                            />


                            {/* <TextInput
                                placeholder='Select Category'
                                style={{
                                    marginTop: 5,
                                    height: 40,
                                    width: width - 25,
                                    paddingLeft: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#24a9a6',
                                }}
                                value={this.state.postlocation}
                                autoCapitalize="words"
                                underlineColorAndroid='transparent'
                                onChangeText={value => this.setState({ postlocation: value })}

                            /> */}
                            



                        </View>

                    </View>
                </ScrollView>



                <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
                    <TouchableOpacity
                        style={{ alignSelf: "center", width: width, height: 50, backgroundColor: '#66CECC', marginTop: 10 }}
                        onPress={() => this.post_data()}>
                        <Text style={{
                            color: '#fff',
                            padding: 5,
                            margin: 10, fontSize: 18,
                            fontWeight: "bold", alignSelf: "center"
                        }}>S A V E   C H A N G E S</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    ImageContainer: {
        marginLeft: 15,
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
        marginLeft: 15,
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
        alignSelf: "flex-start",
        marginTop: 15,
        marginLeft: 10,
        marginBottom: 5,
        fontWeight: "bold"

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
        marginBottom: 30
    },
    buttonText: {
        color: '#FFF',
        fontSize: 15
    }, input: {

        marginTop: 5,
        height: 40,
        width: width - 25,
        paddingLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#24a9a6',

    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

});
