/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  DeviceEventEmitter,
} from 'react-native';

import Beacons from 'react-native-beacons-manager';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Home = () => {

  const uuid = useState('7b44b47b-52a1-5381-90c2-f09b6838c5d4');
  const identifier = useState('i-found-beacons');

  useEffect(() => {
    console.log('use effect rendering');
  })
  return (
    <>
      <StatusBar backgroundColor="#84769a" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.textColor}>
              Test
           </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#563d7c',
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  textColor: {
    color: Colors.white,
  }
});

export default Home;
