import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  StatusBar,
  SafeAreaView,
  Animated,
  Image,
  FlatList,
} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Footer from './Footer';
import FakeBeacons from './FakeBeacons';
import Icon from 'react-native-vector-icons/FontAwesome';

const Box = ({backgroundColor = '#21252d', scale = 0}) => (
  <Animated.View
    style={[
      {
        backgroundColor,
        transform: [{scale}],
      },
    ]}>
    <Image
      source={require('../assets/seraching-back.png')}
      style={styles.imageStyle}></Image>
    <Text style={styles.text}>Procurando Dispositivo</Text>
  </Animated.View>
);

const BoxIcon = ({backgroundColor = '#282e39', scale = 0}) => (
  <Animated.View
    style={[
      {
        backgroundColor,
        transform: [{scale}],
      },
    ]}>
    <Icon
      reverse
      size={30}
      name="arrow-down"
      type="font-awesome-5"
      color="#f50"
    />
  </Animated.View>
);

const usePulse = (startDelay = 500) => {
  const scale = useRef(new Animated.Value(2.1)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {toValue: 1.8}),
      Animated.timing(scale, {toValue: 2.1}),
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return scale;
};

const usePulseIcon = (startDelay = 500) => {
  const scale = useRef(new Animated.Value(1.5)).current;

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {toValue: 1.0}),
      Animated.timing(scale, {toValue: 1.5}),
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => clearTimeout(timeout);
  }, []);

  return scale;
};

const home = () => {
  const [identifier, setIdentifier] = useState('ibeacon');
  const [uuid, setUuid] = useState(null);
  const [beacons, setBeacons] = useState([]);
  const [amountOfPing, setAmountOfPing] = useState(0);
  const scale = usePulse();
  const iconScale = usePulseIcon();

  useEffect(() => {
    const region = {
      identifier: identifier,
      uuid: uuid,
    };

    // setBeacons(FakeBeacons);

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

  const renderItem = ({item}) => (
    <View style={styles.listItem}>
      <View style={styles.titleRowStyle}>
        <View style={styles.rowsFormat}>
          <View>
            <Text style={styles.titleText}>Dispositivo localizado</Text>
          </View>
          <View>
            <Icon
              raised
              size={30}
              name="map-marker"
              type="font-awesome-5"
              color="#41464e"
            />
          </View>
        </View>
      </View>
      <View style={styles.secondRowStyle}>
        <BoxIcon scale={iconScale} />
      </View>
      <View style={styles.firstRowStyle}>
        <View style={styles.rowsFormat}>
          <View>
            <Text style={styles.distanceText}>
              Aproximadamente {item.distance.toFixed(2)} metros
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footerRowStyle}>
        <Text style={styles.proximityText}>
          O seu dispositivo está {translateProximity(item.proximity)}
        </Text>
      </View>
    </View>
  );

  const translateProximity = (proximity) => {
    if (proximity === 'immediate') {
      proximity = 'muito perto';
    } else if (proximity === 'near') {
      proximity = 'perto';
    } else if (proximity === 'far') {
      proximity = 'distante';
    }
    return proximity;
  };

  return (
    <>
      <StatusBar backgroundColor="#21252d" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.body}>
          {beacons.length == 0 && (
            <View style={styles.searchingContent}>
              <Box scale={scale} />
            </View>
          )}
          {beacons.length > 0 && (
            <View style={styles.listContent}>
              {/* <Card
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
              </Card> */}
              <View style={styles.listTitleOutSide}>
                <Text style={styles.proximityText}>DISPOSITIVOS</Text>
              </View>
              <FlatList
                style={{marginTop: 15}}
                contentContainerStyle={styles.list}
                data={beacons}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          <Footer footerText="I-Found Inc. 2020" footerColor="#21252d"></Footer>
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
  searchingContent: {
    flex: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.white,
  },
  text: {
    color: '#ffff',
    fontSize: 10,
  },
  titleTextOutSide: {
    color: '#ffff',
    fontSize: 18,
    fontFamily: 'System',
  },
  imageStyle: {
    width: 110,
    height: 100,
  },
  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#EEE',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#282e39',
    borderColor: '#282e39',
    borderRadius: 10,
  },
  listTitleOutSide: {
    flexDirection: 'column',
    padding: 20,
    paddingLeft: 24,
    paddingBottom: 0,
  },
  distanceText: {
    color: '#ffff',
  },
  proximityText: {
    color: '#71a202',
  },
  titleRowStyle: {
    height: 50,
    alignSelf: 'stretch',
  },
  titleText: {
    color: '#ffff',
    fontSize: 15,
  },
  firstRowStyle: {
    height: 30,
    alignSelf: 'center',
  },
  secondRowStyle: {
    height: 50,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  footerRowStyle: {
    height: 30,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  rowsFormat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default home;
