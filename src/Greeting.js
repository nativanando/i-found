/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Greeting = ({navigation}) => {
  const requestLocationPermission = async () => {
    const chckLocationPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      navigation.navigate('Home');
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'I-Found Tracking',
            message:
              'We need to access to your location to found your devices!!',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate('Home');
        } else {
          alert("You don't have access for the location");
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <>
      <StatusBar backgroundColor="#84769a" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.content}>
            <Button
              large
              icon={<Icon name="search" size={15} color="white" />}
              buttonStyle={{
                backgroundColor: '#f24a58',
                borderRadius: 20,
                height: 70,
                width: 250,
              }}
              title=" Rastrear dispositivo! "
              onPress={requestLocationPermission}
            />
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
});

export default Greeting;
