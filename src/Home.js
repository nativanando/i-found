import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, DeviceEventEmitter } from 'react-native';
import Beacons from 'react-native-beacons-manager';

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
    <View style={styles.container}>
      <Text style={styles.btleConnectionStatus}>
        Bluetooth connection status: {bluetoothState ? bluetoothState : 'NA'}
      </Text>
      <Text style={styles.headline}>
        All beacons in the area
        </Text>
    </View>
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
    paddingTop: 20
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
  smallText: {
    fontSize: 11
  }
});


export default home;