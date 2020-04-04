import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, Linking, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Footer = (props) => {
  const {footerText} = props;
  const {textStyle, viewStyle} = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}> {footerText}</Text>
    </View>
  );
};

Footer.propTypes = {
  footerText: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: Colors.white,
  },
  viewStyle: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21252d',
  },
});

export default Footer;
