import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, DeviceEventEmitter, StatusBar, SafeAreaView } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const home = () => {

  const [identifier, setIdentifier] = useState('GemTot for iOS');
  const [uuid, setUuid] = useState('6665542b-41a1-5e00-931c-6a82db9b78c1');
  const [bluetoothState, setBluetoothState] = useState('');

  useEffect(() => {
    const region = {
      identifier: identifier,
      uuid: uuid
    };

    Beacons.detectIBeacons()

    Beacons
      .startRangingBeaconsInRegion(region)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error => console.log(`Beacons ranging not started, error: ${error}`));

    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log(data);
      }
    );
  });

  return (
    <>
      <StatusBar backgroundColor="#84769a" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.content}>
            <Text style={styles.textColor}>
              Bluetooth connetado: {bluetoothState ? bluetoothState : 'NA'}
            </Text>
            <Text style={styles.headline}>
              Dispositivos próximos
        </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20,
    color: Colors.white
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
  smallText: {
    fontSize: 11
  },
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


export default home;