/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, Slider } from 'react-native';
import { Row } from 'native-base';
import RadioButton from 'radio-button-react-native';
var { width, height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class searchfilter extends Component {
  constructor() {
    super();
    this.state = {
      SliderValue: 0,
      SliderValue1: 0,
      value: 0
    }
  }


  handleOnPress(value) {
    this.setState({ value: value })
  }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: '#fcfefb', }}>


        <Text style={styles.welcome}>Location</Text>
        <TextInput
          placeholder='Canada'
          style={styles.input}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.onSubmitHandler()}
          returnKeyType={'next'}

        />

        <Text style={styles.welcome}>Distance</Text>

        <Slider
          step={1}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#009688"
          onValueChange={(ChangedValue) => this.setState({ SliderValue: ChangedValue })}
          style={{ marginLeft: 15, marginRight: 15, width: '95%', height: 50 }}
        />

        <Text style={{ fontSize: 14, alignSelf: "center", fontWeight: "bold" }}> {this.state.SliderValue}KM</Text>


        <Text style={styles.welcome}>Price</Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={1000}
          minimumTrackTintColor="#009688"
          onValueChange={(ChangedValue) => this.setState({ SliderValue1: ChangedValue })}
          style={{ marginLeft: 15, marginRight: 15, width: '95%', height: 50 }}
        />

        <Text style={{ fontSize: 14, alignSelf: "center", fontWeight: "bold" }}> ${this.state.SliderValue1}</Text>
        <Text style={styles.welcome}>Sort By</Text>
        <TextInput
          placeholder='Relevance'
          style={styles.input}
          underlineColorAndroid='transparent'
          onSubmitEditing={() => this.onSubmitHandler()}
          returnKeyType={'next'}

        />
        <Text style={styles.welcome}>Type</Text>
        <View style={{ flexDirection: "row", margin: 15 }}>
          <RadioButton style={{
            marginTop: 15,
            marginLeft: 15, borderColor: '#66CECC'
          }} currentValue={this.state.value} value={0} onPress={this.handleOnPress.bind(this)}>

            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft:10,marginRight:100
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
        <View style={{flex:1,alignItems:"flex-end",justifyContent:"flex-end"}}>
        <TouchableOpacity
          style={{ alignSelf: "center", width: width, backgroundColor: '#66CECC'}}
          onPress={() => navigate('')}>
          <Text style={{
            color: '#fff',
            padding: 5,
            margin: 10,fontSize:18,
            fontWeight: "bold", alignSelf: "center"
          }}>A P P L Y</Text>
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
    alignSelf: "center",
    marginTop: 10,
    height: 35,
    width: width - 25,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0.5,
    borderColor: '#66CECC'
  },
});
