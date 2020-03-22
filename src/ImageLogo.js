import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

const ImageLogo = () => (
  <Image
    source={require('../assets/logo_transparent.png')}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
    marginRight: 10,
    marginBottom: 12,
    marginTop: 12,
  },
});

export default ImageLogo;
