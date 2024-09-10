import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { backgroundColor, foregroundColor } from '~/constants/colours';

class TimerClass {
  // Need to figure out how this will work
}

export default function Timer() {
  const timer = new TimerClass();
  return (
    <View style={styles.container}>
      <View style={styles.circleBackground}>
        <Text style={styles.counter}>1</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.timerButton}>start</Text>
        <Text style={styles.timerButton}>stop</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
    height: '100%',
    maxWidth: 300,
    width: '100%',
    backgroundColor: foregroundColor,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
    borderRadius: 300 / 2,
    width: 250,
    height: 250,
  },
  counter: {
    fontSize: 70,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  timerButton: {
    color: 'white',
    fontSize: 40,
  },
});
