import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, Linking, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useEffect} from 'react';

const Footer = (props) => {
  const {footerText, footerColor} = props;
  const {textStyle, viewStyle} = styles;

  return (
    <View style={viewStyle} backgroundColor={footerColor}>
      <Text style={textStyle}>{footerText}</Text>
    </View>
  );
};

Footer.propTypes = {
  footerText: PropTypes.string.isRequired,
  footerColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 17,
    color: '#4a6c8b',
  },
  viewStyle: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
});

export default Footer;
