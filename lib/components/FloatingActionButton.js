import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import ColorConfig from '../configs/ColorConfig';

class FloatingActionButton extends React.Component {
  render () {
    return (
      <TouchableOpacity 
        onPress={this.props.onPress}
        style={styles.fab}>
        <Icon name='add' color='white'/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    width: 50,
    height: 50,
    right: 20,
    bottom: 90,
    borderRadius: 30,
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorConfig.primaryColor
  }
});

export default FloatingActionButton;