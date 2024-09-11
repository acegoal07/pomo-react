import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import UtilityBelt from '../components/utilitybelt';
import { backgroundColor } from '../constants/colours';

import Timer from '~/components/timer';

export default function Pomo() {
  const [pomoCount, setPomoCount] = React.useState(0);
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    if (pomoCount === 8) {
      setPomoCount(0);
      setCounter((prev) => prev + 1);
    }
  }, [pomoCount]);

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../assets/images/pomoLogo.webp')}
        />
      </View>
      <UtilityBelt counter={counter} setCounter={setCounter} />
      <Timer setPomoCounter={setPomoCount} />
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
    maxHeight: 170,
    height: '100%',
    maxWidth: 457,
    width: '100%',
    alignSelf: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
});
