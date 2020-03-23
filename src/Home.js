import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  StatusBar,
  SafeAreaView,
  SectionList,
} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Footer from './Footer';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements';

const home = () => {
  const [identifier, setIdentifier] = useState('ibeacon');
  const [uuid, setUuid] = useState(null);
  const [beacons, setBeacons] = useState([]);

  useEffect(() => {
    const region = {
      identifier: identifier,
      uuid: uuid,
    };

    Beacons.detectIBeacons();

    Beacons.startRangingBeaconsInRegion(identifier, null)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch(error =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );

    const BeaconEvent = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      data => {
        setBeacons(data.beacons);
      },
    );

    return () => {
      Beacons.stopMonitoringForRegion(region) // or like  < v1.0.7: .stopMonitoringForRegion(identifier, uuid)
        .then(() => console.log('Beacons monitoring stopped succesfully'))
        .catch(error =>
          console.log(`Beacons monitoring not stopped, error: ${error}`),
        );
      BeaconEvent.remove();
    };
  });

  const renderRangingRow = rowData => {
    rowData.item.proximity = translateProximity(rowData.item.proximity);
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          Dispositivo identificado:{' '}
          {rowData.item.uuid ? rowData.item.uuid : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.item.major ? rowData.item.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.item.minor ? rowData.item.minor : 'NA'}
        </Text>
        <Text>
          Força do sinal: {rowData.item.rssi ? rowData.item.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.item.proximity ? rowData.item.proximity : 'NA'}
        </Text>
        <Text>
          Distance:{' '}
          {rowData.item.distance ? rowData.item.distance.toFixed(2) : 'NA'}{' '}
          metros
        </Text>
      </View>
    );
  };

  const translateProximity = proximity => {
    if (proximity === 'immediate') {
      proximity = 'Muito perto';
    } else if (proximity === 'near') {
      proximity = 'Perto';
    } else if (proximity === 'far') {
      proximity = 'Longe';
    }
    return proximity;
  };

  return (
    <>
      <StatusBar backgroundColor="#161c2e" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.body}>
          {beacons.length == 0 && (
            <View style={styles.content}>
              <Text style={styles.text}>Nenhum dispositivo na região</Text>
            </View>
          )}
          <FlatList
            data={beacons}
            keyExtractor={(item, index) => item + index}
            renderItem={renderRangingRow}
          />
          <Footer footerText="I-Found Inc. 2020"></Footer>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headline: {
    fontSize: 20,
    paddingTop: 20,
    color: Colors.white,
  },
  body: {
    backgroundColor: '#161c2e',
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
  },
  text: {
    color: '#ef6b35',
    fontSize: 20,
  },
});

export default home;
