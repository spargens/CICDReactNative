import {useEffect} from 'react';
import {Alert, Button, View} from 'react-native';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

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
    <View style={{marginTop: 40}}>
      <Button title="Crash" onPress={() => Crashes.generateTestCrash()} />
      <Button
        title="Calculate Inflation"
        onPress={() => {
          Analytics.trackEvent('calculate_inflation', {
            Internet: 'WiFi',
            GPS: 'On',
          });
        }}
      />
    </View>
  );
}
