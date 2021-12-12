import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Option = props => {
  const pressHandler = () => {
    props.onPress(props.text);
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={{...styles.option, ...props.style}}>
        <Text style={!props.textStyle ? styles.optionText : props.textStyle}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    borderWidth: 2,
    borderColor: '#fff',
    marginVertical: 10,
    padding: 6,
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Option;
