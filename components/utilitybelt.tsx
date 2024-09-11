import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import { accentColor } from '../constants/colours';

interface UtilityBeltProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function UtilityBelt({ counter, setCounter }: UtilityBeltProps) {
  const [buttonHover, setButtonHover] = React.useState({
    leaderboard: false,
    login: false,
    information: false,
  });

  /**
   * Handle the hover state of the icons
   * @param {'leaderboard' | 'login' | 'information'} target - The icon that is being hovered
   */
  const handleIconHover = (target: 'leaderboard' | 'login' | 'information') => {
    switch (target) {
      case 'leaderboard':
        setButtonHover({ ...buttonHover, leaderboard: !buttonHover.leaderboard });
        break;
      case 'login':
        setButtonHover({ ...buttonHover, login: !buttonHover.login });
        break;
      case 'information':
        setButtonHover({ ...buttonHover, information: !buttonHover.information });
        break;
      default:
        throw new Error('Invalid hover target');
    }
  };

  /**
   * Handle the press event for the leaderboard icon
   */
  const handleLeaderBoardPress = () => {
    console.log('Leaderboard pressed');
  };

  /**
   * Handle the press event for the login icon
   */
  const handleLoginPress = () => {
    console.log('Login pressed');
  };

  /**
   * Handle the press event for the information icon
   */
  const handleInformationPress = () => {
    console.log('Information pressed');
  };

  return (
    <View style={styles.utilityBelt}>
      <Pressable
        style={
          buttonHover.leaderboard
            ? { ...styles.iconShadow, ...styles.iconHover }
            : styles.iconShadow
        }
        onPointerEnter={() => handleIconHover('leaderboard')}
        onPointerLeave={() => handleIconHover('leaderboard')}
        onPress={handleLeaderBoardPress}>
        <Image style={styles.icons} source={require('../assets/images/leaderboardIcon.webp')} />
      </Pressable>
      <Text style={styles.counter}>{counter}</Text>
      <Pressable
        style={
          buttonHover.login ? { ...styles.iconShadow, ...styles.iconHover } : styles.iconShadow
        }
        onPointerEnter={() => handleIconHover('login')}
        onPointerLeave={() => handleIconHover('login')}
        onPress={handleLoginPress}>
        <Image
          style={styles.icons}
          resizeMode="contain"
          source={require('../assets/images/loginIcon.webp')}
        />
      </Pressable>
      <Pressable
        style={
          buttonHover.information
            ? { ...styles.iconShadow, ...styles.iconHover }
            : styles.iconShadow
        }
        onPointerEnter={() => handleIconHover('information')}
        onPointerLeave={() => handleIconHover('information')}
        onPress={handleInformationPress}>
        <Image
          style={styles.icons}
          resizeMode="contain"
          source={require('../assets/images/informationIcon.webp')}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  utilityBelt: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: 73.6,
    height: '100%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  icons: {
    maxHeight: 73.6,
    height: '100%',
    maxWidth: 73.6,
  },
  iconShadow: {
    borderRadius: 50,
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  },
  iconHover: {
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.5)',
  },
  counter: {
    fontSize: 60,
    fontWeight: 'bold',
    color: accentColor,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
