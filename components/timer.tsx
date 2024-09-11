import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { backgroundColor, foregroundColor } from '~/constants/colours';

interface timerProps {
  setPomoCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function Timer({ setPomoCounter }: timerProps) {
  const [iconHover, setIconHover] = React.useState({
    start: false,
    stop: false,
  });
  const timeOutput = React.useRef(25 * 60000);
  const [counter, setCounter] = React.useState('25:00');
  const intervalID = React.useRef<NodeJS.Timeout | null>(null);

  function handleMouseEnter(icon: string) {
    setIconHover({ ...iconHover, [icon]: true });
  }

  function handleMouseLeave(icon: string) {
    setIconHover({ ...iconHover, [icon]: false });
  }

  const startTimer = () => {
    if (timeOutput.current === 0) {
      timeOutput.current = 25 * 60000;
    }
    setCounter(msToTime(timeOutput.current));
    intervalID.current = setInterval(() => {
      if (intervalID.current) {
        if (timeOutput.current <= 0) {
          setPomoCounter((prev) => prev + 1);
          stopTimer();
        } else {
          timeOutput.current = timeOutput.current - 1000;
          setCounter(msToTime(timeOutput.current));
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
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => startTimer()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            style={
              iconHover.start
                ? { ...styles.buttonIcons, ...styles.buttonIconsHover }
                : styles.buttonIcons
            }>
            <path
              onPointerEnter={() => handleMouseEnter('start')}
              onPointerLeave={() => handleMouseLeave('start')}
              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
            />
          </svg>
        </Pressable>
        <Pressable onPress={() => stopTimer()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            style={
              iconHover.stop
                ? { ...styles.buttonIcons, ...styles.buttonIconsHover }
                : styles.buttonIcons
            }>
            <path
              onMouseEnter={() => handleMouseEnter('stop')}
              onMouseLeave={() => handleMouseLeave('stop')}
              d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
            />
          </svg>
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
    z = z || 2;
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.5)',
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
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 20,
  },
  buttonIcons: {
    height: 100,
    width: 100,
    fill: 'white',
    filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))',
  },
  buttonIconsHover: {
    filter: 'drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.5))',
  },
});
