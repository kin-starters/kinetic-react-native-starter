import {Keypair} from '@mogami/keypair';
import {MogamiSdk} from '@mogami/sdk';
import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [sdk, setSdk] = useState<MogamiSdk | null>();
  const [mnemonic, setMnemonic] = useState<string>(() =>
    Keypair.generateMnemonic(),
  );
  const [keypair, setKeypair] = useState<Keypair>(
    () => Keypair.fromMnemonicSet(mnemonic)[0],
  );

  const randomMnemonic = () => {
    const newMnemonic = Keypair.generateMnemonic();
    const kp = Keypair.fromMnemonicSet(newMnemonic)[0] as Keypair;
    setMnemonic(newMnemonic);
    setKeypair(kp);
  };

  useEffect(() => {
    if (sdk) {
      return;
    }
    MogamiSdk.setup({index: 1, endpoint: 'devnet'}).then(res => {
      setSdk(res);
    });
  }, [sdk, setSdk]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {sdk?.sdkConfig ? (
            <Section title="Endpoint">
              {JSON.stringify(sdk.sdkConfig.endpoint, null, 2)}
            </Section>
          ) : null}
          {sdk ? (
            <Section title="Mogami App">
              {JSON.stringify(sdk.config()?.app, null, 2)}
            </Section>
          ) : null}
          {keypair?.publicKey ? (
            <Section title="Public Key">{keypair?.publicKey}</Section>
          ) : null}
          {mnemonic ? <Section title="Mnemonic">{mnemonic}</Section> : null}
          <Button title="New Mnemonic" onPress={randomMnemonic} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
