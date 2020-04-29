import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

const ImageBackground = () => (
  <Image source={require('../assets/image_background.png')} />
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

export default ImageBackground;
