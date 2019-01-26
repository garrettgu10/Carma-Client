import React from 'react';
import { Modal, StyleSheet, Text, Button, View, TextInput } from 'react-native';
import WebView from 'rn-webview';
import {AsyncStorage} from 'react-native';

function getUrlVars(location) {
  var vars = {};
  var parts = location.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}


export default class App extends React.Component {

  serverRedirectURI = "http://localhost/smartcar.php";

  constructor() {
    super();

    this.state = {
      modalVisible:false,
      color: "",
      manufacturer: ""
    }
    
    AsyncStorage.getItem('@Carma:vid').then((value) => {
      this.setState({vid: value})
    })
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  getStateStr = () => {
    return JSON.stringify({color: this.state.color, manufacturer: this.state.manufacturer});
  }

  handleNavigationStateChange = (state) =>{
    var url = state.url;
    if(getUrlVars(url)['vid']){
      AsyncStorage.setItem('@Carma:vid', getUrlVars(url)['vid']).then(() => {
        this.setModalVisible(false);
      });
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Garrett's test app</Text>
        <Text>{this.state.vid? "Your vehicle id is: " + this.state.vid : "You have not yet registered your vehicle"}</Text>
        <TextInput
          onChangeText={(color) => this.setState({color})}
          value={this.state.color}
          placeholder="Color"
          style={{height:30, width:300, backgroundColor: "#ededed"}}
          />
        <TextInput
          onChangeText={(manufacturer) => this.setState({manufacturer})}
          value={this.state.manufacturer}
          placeholder="Manufacturer"
          style={{height:30, width:300, backgroundColor: "#ededed"}}
          />
        <Button title="Register your vehicle" onPress={() => { this.setModalVisible(true) }}></Button>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={{marginTop: 30, height: "100%", flex:1}}>
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="close">
              </Button>
              <WebView
                startinLoadingState={true}
                renderLoading={console.log}
                onNavigationStateChange={this.handleNavigationStateChange}
                source={{uri: "https://connect.smartcar.com/oauth/authorize?mode=test&response_type=code&client_id=5b33ca48-de7e-4619-965e-ecdd4af3d899&scope=read_vehicle_info read_location&redirect_uri=" + this.serverRedirectURI + "&state=" + this.getStateStr()}}
                style={{backgroundColor: '#fff', height:"100%"}}
              />
            </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
