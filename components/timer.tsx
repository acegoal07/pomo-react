import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { backgroundColor, foregroundColor } from '~/constants/colours';

export default function Timer() {
  const timeOutput = React.useRef(5);
  const [counter, setCounter] = React.useState(timeOutput.current);
  const intervalID = React.useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timeOutput.current === 0) {
      timeOutput.current = 5;
    }
    setCounter(timeOutput.current);
    intervalID.current = setInterval(() => {
      if (intervalID.current) {
        if (timeOutput.current <= 0) {
          clearInterval(intervalID.current);
        } else {
          timeOutput.current = timeOutput.current - 1;
          setCounter(timeOutput.current);
        }
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalID.current!);
    intervalID.current = null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleBackground}>
        <Text style={styles.counter}>{counter}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => startTimer()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={styles.buttonIcons}>
            <path
              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              fill="white"
            />
          </svg>
        </Pressable>
        <Pressable onPress={() => stopTimer()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={styles.buttonIcons}>
            <path
              d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
              fill="white"
            />
          </svg>
        </Pressable>
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
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    gap: 20,
  },
  buttonIcons: {
    height: 100,
    width: 100,
  },
});
