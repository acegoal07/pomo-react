import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { backgroundColor, foregroundColor } from '~/constants/colours';

interface TimerProps {
  pomoCounter: number;
  setPartialPomoScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Timer({ pomoCounter, setPartialPomoScore }: Readonly<TimerProps>) {
  const breakTime = 5 * 60000;
  const workTime = 25 * 60000;
  const timeOutput = React.useRef<number>(workTime);
  const [counter, setCounter] = React.useState('25:00');
  const intervalID = React.useRef<NodeJS.Timeout | null>(null);

  /**
   * Start the timer
   */
  function startTimer() {
    if (intervalID.current) {
      return;
    }
    if (timeOutput.current === 0) {
      if (pomoCounter % 2 !== 0) {
        timeOutput.current = breakTime;
      } else {
        timeOutput.current = workTime;
      }
    }
    setCounter(msToTime(timeOutput.current));
    intervalID.current = setInterval(() => {
      if (intervalID.current) {
        if (timeOutput.current <= 0) {
          setPartialPomoScore((prev) => prev + 1);
          stopTimer();
        } else {
          timeOutput.current = timeOutput.current - 1000;
          setCounter(msToTime(timeOutput.current));
        }
      }
    }, 1000);
  }

  /**
   * Stop the timer
   */
  function stopTimer() {
    clearInterval(intervalID.current!);
    intervalID.current = null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.circleBackground}>
        <Text style={styles.counter}>{counter}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => startTimer()}>
          <Svg viewBox="0 0 384 512" fill="white" style={styles.buttonIcons}>
            <Path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </Svg>
        </Pressable>
        <Pressable onPress={() => stopTimer()}>
          <Svg viewBox="0 0 320 512" fill="white" style={styles.buttonIcons}>
            <Path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
          </Svg>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * Milliseconds to timestamp
 * @param {Number} s Milliseconds
 * @returns {String} Timestamp
 */
function msToTime(s: number): string {
  function pad(n: string | number, z: number | undefined) {
    z = z ?? 2;
    return ('00' + n).slice(-z);
  }
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;
  return `${pad(mins, 2)}:${pad(secs, 2)}`;
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
    height: '100%',
    maxWidth: 300,
    width: '100%',
    backgroundColor: foregroundColor,
    borderRadius: 10,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 9,
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
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowRadius: 6,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },
  buttonIcons: {
    height: 100,
    width: 100,
  },
});
