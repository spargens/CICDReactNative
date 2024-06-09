import {useEffect} from 'react';
import {Alert, Button, FlatList, Image, View, Dimensions} from 'react-native';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';
import imgs from './imgs';

const {width, height} = Dimensions.get('screen');

export default function App() {
  useEffect(() => {
    checkPreviousSession();
  }, []);

  async function checkPreviousSession() {
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      const report = await Crashes.lastSessionCrashReport();
      Alert.alert('Sorry for the crash. We are working on it!');
    }
  }

  return (
    <View>
      {/* <Button title="Crash" onPress={() => Crashes.generateTestCrash()} />
      <Button
        title="Calculate Inflation"
        onPress={() => {
          Analytics.trackEvent('calculate_inflation', {
            Internet: 'WiFi',
            GPS: 'On',
          });
        }}
      /> */}
      <FlatList
        data={imgs}
        keyExtractor={(_, index) => index}
        horizontal={true}
        renderItem={({item, index}) => {
          return (
            <View>
              <Image
                source={{uri: item}}
                style={{width: width, height: height}}
                resizeMode="cover"
              />
            </View>
          );
        }}
      />
    </View>
  );
}
