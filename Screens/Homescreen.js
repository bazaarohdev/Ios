import React, { Component } from 'react';
import { StatusBar, Platform, StyleSheet, Alert, Dimensions, ImageBackground, Text, View, Image, TextInput, ActivityIndicator, BackHandler, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { Drawer, Header, Container, Button, Title, Footer, Left, Right, Body, Content } from 'native-base';
var { width, height } = Dimensions.get('window');
import Sidebar from './sidebar';

export default class Homescreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      data1: [],

      isLoading: true
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };


  goto(route, props) {
    console.log("navigation" + route);
    const { navigate } = this.props.navigation;
    navigate(route, props);
  }
  handleBackButtonClick() {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'Yes',
        onPress: () => BackHandler.exitApp()
      },], {
        cancelable: false
      }
    )
    return true;
  }

  componentWillMount() {
    this.getData();
    this.getData1();
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  getData() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    var passUrl = 'https://seoteam.website/api/api.php?method=cat'
    console.log('*****************enquiresurl********************' + passUrl);
    return fetch(passUrl)

      .then((response) => response.json())

      .then((responseJson) => {
        //  console.log('==========datares===========' + responseJson.leadscount)
        this.setState({
          data: responseJson.catlist,
          isLoading: false
        });
        console.log('==========data===========' + this.state.data)

      })
      .catch((error) => { console.error(error); });
  }
  getData1() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    var passUrl = 'https://seoteam.website/api/api.php?method=product'
    console.log('*****************enquiresurl********************' + passUrl);
    return fetch(passUrl)

      .then((response) => response.json())

      .then((responseJson) => {
        //  console.log('==========datares===========' + responseJson.leadscount)
        this.setState({
          data1: responseJson.productlist,
          isLoading: false
        });
        console.log('==========data===========' + this.state.data)

      })
      .catch((error) => { console.error(error); });
  }


  _renderItem1 = (itemData) => {
    var pid = itemData.item.productid
    // console.log(+pid)
    if (itemData.item.image == null) {
      var image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-EEhlOPI8EgWJsU7NDWt1vRf2T_CypsqE1M2Mm3MBVDYJUW5"
    }
    else {
      var image = itemData.item.image
    }
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={{
        shadowColor: '#000000', shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.4, shadowRadius: 2, elevation: 1.5, borderColor: '#e6e6e6'
        , alignItems: "center", backgroundColor: '#66CECC', height: 202, width: "47%",
        borderRadius: 0, margin: 5, padding: 5
      }} onPress={() => navigate('productpage',{product_id:pid})}>


        <Image source={{ uri: image }}
          style={{height:"70%", width: "100%",alignSelf:"center",resizeMode:"contain", justifyContent: 'center', alignItems: 'center' }} />

        <Text style={{ color: '#000', fontWeight: "bold", marginTop: 5 }}>{itemData.item.productname}</Text>
        <View style={{borderRadius:15,backgroundColor:"#DCDCDC",height:22,width:60,alignSelf:"flex-end",marginTop:5,margin:4,justifyContent:"center"}}><Text style={{ color: '#000', fontWeight: "bold",alignSelf:"center" }}>${itemData.item.price}</Text>
        </View>

      </TouchableOpacity>


    );
  }

  _renderItem = (itemData) => {
    return (
      <View style={{ margin: 10, borderRadius: 10, }}>
        <ImageBackground source={{ uri: itemData.item.image }} style={{ marginLeft: 5, marginRight: 5, height: 50, width: 120, alignItems: "center", justifyContent: "center",resizeMode:"contain" }}>
        <View style={{backgroundColor:"#000",opacity:0.6,height: 50, width: 120,alignItems:"center",justifyContent:"center"}}><Text style={{ color: '#fff', fontWeight: "bold", fontSize: 16, }}>{itemData.item.catname}</Text>
       </View>
        </ImageBackground>


      </View>

    );
  }
  _keyExtractor = (item, index) => index;
  render() {

    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='#039e8b' barStyle="light-content" translucent />
        <Drawer
          tapToClose={true}
          ref={(ref) => { this.drawer = ref; }}
          content={<Sidebar route={this.goto.bind(this)} closeDrawer={this.closeDrawer.bind(this)} />} >

          <Container>

            <Header style={{ backgroundColor: "#fff", marginTop: 15, justifyContent: 'center', alignItems: 'center', }}>
              <Left>
                <Button transparent onPress={this.openDrawer.bind(this)} >
                  <Image source={require('../images/menu.png')} style={{ resizeMode: "stretch", height: 25, width: 25 }} />
                </Button>
              </Left>
              <View style={styles.SectionStyle}  >
                <TextInput
                  style={{ padding: 10 }}
                  placeholder='Search                         '
                  underlineColorAndroid='transparent'
                  placeholderTextColor='black'>
                </TextInput>
                <Image source={require('../images/magnifyingglass.png')} style={{ resizeMode: "stretch", margin: 5, height: 15, width: 15 }} />
              </View>
              <Right>
                
                <TouchableOpacity activeOpacity={.5} onPress={() => navigate("")}>
                  <Image source={require('../images/notification.png')} style={{ resizeMode: "stretch", height: 25, width: 25 }} />
                </TouchableOpacity >

                <TouchableOpacity activeOpacity={.5} onPress={() => navigate("searchfilterpage")}>
                  <Image source={require('../images/threelines.png')} style={{ resizeMode: "stretch", marginLeft: 10, height: 25, width: 25 }} />
                </TouchableOpacity >
              
              </Right>
            </Header>
            <Content style={{ backgroundColor: "#FFF" }}>
              <View style={{ flex: 1 }}>
                <View style={{ alignItems: "flex-start" }}>
                  <Image source={require('../images/shopp.png')} style={{ margin: 5, height: 50, width: 100 }} />
                </View>
                <FlatList horizontal={true}
                  data={this.state.data}
                  showsVerticalScrollIndicator={false}
                  renderItem={this._renderItem}
                  keyExtractor={this._keyExtractor}>
                </FlatList>


                <FlatList
                  data={this.state.data1}
                  showsVerticalScrollIndicator={false}
                  renderItem={this._renderItem1}
                  numColumns={2}
                  keyExtractor={this._keyExtractor}>
                </FlatList>
              </View>

            </Content>
            <Footer style={{ backgroundColor: "#fff" }}>
              <TouchableOpacity style={{ borderRadius: 10, backgroundColor: '#66CECC', margin: 10 }} onPress={() => navigate('Addproductpage')}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={require('../images/photocamera.png')} style={{ marginLeft: 15, height: 30, width: 30 }} />
                  <Text style={{
                    color: '#fff',
                    padding: 5,
                    margin: 5,
                    fontWeight: "bold"
                  }}>Sell Now</Text></View>
              </TouchableOpacity>
            </Footer>
          </Container>
        </Drawer>
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

  input: {
    marginTop: 15,
    height: 35,
    width: 250,
    borderRadius: 2,
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 1.5,
    padding: 5,
    backgroundColor: '#999999',
    borderColor: '#e6e6e6'
  },
  textstyle: {
    fontSize: 15,
    marginLeft: 65
  },
  info: {
    // width: 200,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 20
  },
  text: {
    color: '#4f603c',
    marginTop: 100,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',

  },
  SectionStyle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#66CECC',
    height: 30,
    width: 200,
    borderRadius: 25,
    margin: 10,

  },
});

