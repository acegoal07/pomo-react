import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import UtilityBelt from '../components/utilitybelt';
import { backgroundColor } from '../constants/colours';

import Timer from '~/components/timer';

export default function Pomo() {
  const [counter, setCounter] = React.useState(0);
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/images/pomoLogo.webp')} />
      </View>
      <UtilityBelt counter={counter} setCounter={setCounter} />
      <Timer />
      <Text>Pomo is back and this time in react</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor,
    flex: 1,
    padding: 20,
    paddingTop: 10,
    overflow: 'scroll',
  },
  logoContainer: {
    maxHeight: 193,
    height: '100%',
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
