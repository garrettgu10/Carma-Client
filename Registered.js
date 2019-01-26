//contains the panel that shows after the vehicle has been registered
import React from 'react';
import { Modal, StyleSheet, Text, Button, View, TextInput } from 'react-native';

export default class Registered extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.vid}</Text>
        <Button title="Delete Registration"
          onPress={this.props.deleteRegistration}
          />
      </View>
    )
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
  