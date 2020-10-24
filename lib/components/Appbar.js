import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const renderIconButton = (name, onPress) => 
  <TouchableOpacity 
    onPress={onPress}
    style={styles.iconButton}>
    <Icon name={name}/>
  </TouchableOpacity>

class Appbar extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render () {
    return (
      <View style={styles.container}>
        {renderIconButton(
          'arrow-back',
          this.props.actions.leading
        )}
        <Text 
          numberOfLines={1}
          ellipsizeMode='tail'
          style={styles.title}>
          {this.props.data.title}
        </Text>
        {renderIconButton(
          'check',
          this.props.actions.trailing
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    elevation: 5,
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "white",
    paddingHorizontal: 5,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  title: {
    fontSize: 16,
    maxWidth: 150,
    fontWeight: 'bold',
  },
  iconButton: {
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Appbar;