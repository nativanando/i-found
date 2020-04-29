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
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './Footer';
import ImageLogo from './ImageLogo';

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
            title: 'I-Found',
            message: 'We need to access your location to find your devices!!',
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
      <StatusBar backgroundColor="#3a3d41" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.body}>
          {/* <View style={styles.header}>
            <ImageLogo />
          </View>
          */}
          <Image
            source={require('../assets/image_background.png')}
            style={styles.backgroundImage}></Image>
          <View style={styles.header}>
            <Button
              large
              icon={<Icon name="search" size={15} color="white" />}
              buttonStyle={{
                backgroundColor: '#3a3d41',
                borderRadius: 50,
                height: 65,
                width: 220,
              }}
              title="  Iniciar rastreamento"
              onPress={requestLocationPermission}
              outline="true"
            />
          </View>
          <Footer footerText="I-Found Inc. 2020" footerColor="#ffff"></Footer>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffff',
    height: '100%',
    width: '100%',
  },
  backgroundImage: {
    flex: 2,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
  },
});

export default Greeting;
