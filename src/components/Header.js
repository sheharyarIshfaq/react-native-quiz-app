import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Quiz App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#344cb7',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
});

export default Header;
