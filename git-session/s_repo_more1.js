import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import CompHeader from './compHeader';




const styles = StyleSheet.create({
  sipComponent: {
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
  },
  header: {
    height:50,
    width:'100%'
  },
});

class moreComponent extends Component {
  render() {
    return (
      <View style={styles.sipComponent}>
        <View style={styles.header}>
        <CompHeader title={'More Options'} />
        </View>
         <Icon name="dots-horizontal" size={50} style={{}} />
        <Text>
          Hello More, comming soon...
      </Text>
      </View>
    )
  }
}




export default moreComponent;