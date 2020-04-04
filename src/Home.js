import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ListItem, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const home = () => {
  const [identifier, setIdentifier] = useState('ibeacon');
  const [uuid, setUuid] = useState(null);
  const [beacons, setBeacons] = useState([]);
  const [amountOfPing, setAmountOfPing] = useState(0);

  useEffect(() => {
    const region = {
      identifier: identifier,
      uuid: uuid,
    };

    Beacons.detectIBeacons();

    Beacons.startRangingBeaconsInRegion(identifier, null)
      .then(() => console.log('Beacons ranging started succesfully'))
      .catch((error) =>
        console.log(`Beacons ranging not started, error: ${error}`),
      );

    const BeaconEvent = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        if (data.beacons.length > 0) {
          setBeacons(data.beacons);
          setAmountOfPing(0);
        } else if (data.beacons.length === 0 && amountOfPing < 8) {
          setAmountOfPing(amountOfPing + 1);
        } else if (data.beacons.length === 0 && amountOfPing === 8) {
          setBeacons(data.beacons);
          setAmountOfPing(0);
        }
      },
    );

    return () => {
      Beacons.stopMonitoringForRegion(region) // or like  < v1.0.7: .stopMonitoringForRegion(identifier, uuid)
        .then(() => console.log('Beacons monitoring stopped succesfully'))
        .catch((error) =>
          console.log(`Beacons monitoring not stopped, error: ${error}`),
        );
      BeaconEvent.remove();
    };
  });

  const renderRangingRow = (rowData) => {
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

  const translateProximity = (proximity) => {
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
      <StatusBar backgroundColor="#21252d" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.body}>
          {beacons.length == 0 && (
            <View style={styles.content}>
              <Text style={styles.text}>Nenhum dispositivo na região</Text>
            </View>
          )}
          {beacons.length > 0 && (
            <View>
              <Card
                containerStyle={{
                  backgroundColor: '#282e39',
                  borderColor: '#282e39',
                  borderRadius: 10,
                }}
                dividerStyle={{
                  backgroundColor: '#282e39',
                }}
                titleStyle={{color: '#ffff'}}
                title="Dispositivos">
                {beacons.map((l, i) => (
                  <ListItem
                    containerStyle={{
                      backgroundColor: '#282e39',
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                    subtitleStyle={{color: '#ffff'}}
                    titleStyle={{color: '#ffff'}}
                    rightTitleStyle={{color: '#71a202'}}
                    key={i}
                    // leftIcon={<Icon name="search" size={15} color="white" />}
                    title="Dispositivo localizado"
                    rightTitle={translateProximity(l.proximity)}
                    subtitle={
                      'Distancia: ' + l.distance.toFixed(2) + ' metros '
                    }
                  />
                ))}
              </Card>
            </View>
          )}
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
    backgroundColor: '#21252d',
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {flex: 6},
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
