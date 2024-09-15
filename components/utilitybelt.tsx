import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import InformationPopup from './informationPopup';
import LeaderboardPopup from './leaderboardPopup';
import LoginPopup from './loginPopup';
import { accentColor } from '../constants/colours';

interface UtilityBeltProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function UtilityBelt({ counter, setCounter }: Readonly<UtilityBeltProps>) {
  const [buttonHover, setButtonHover] = React.useState<{
    leaderboard: boolean;
    login: boolean;
    information: boolean;
  }>({
    leaderboard: false,
    login: false,
    information: false,
  });

  /**
   * Handle the mouse entering the button and adds the hover effect
   * @param {string} button The button that the mouse has entered
   */
  function handleMouseEnter(button: string) {
    setButtonHover({ ...buttonHover, [button]: true });
  }

  /**
   * Handle the mouse leaving the button and removes the hover effect
   * @param {string} button The button that the mouse has left
   */
  function handleMouseLeave(button: string) {
    setButtonHover({ ...buttonHover, [button]: false });
  }

  /**
   * Handle the press event for the leaderboard icon
   */
  const [leaderboardPopupVisible, setLeaderboardPopupVisible] = React.useState(false);
  function handleLeaderBoardPress() {
    console.log('Leaderboard pressed');
    setLeaderboardPopupVisible(true);
   
  }

  /**
   * Handle the press event for the login icon
   */

  const [loginPopupVisible, setLoginPopupVisible] = React.useState(false);
  function handleLoginPress() {
    console.log('Login pressed');
    setLoginPopupVisible(true);
  


  }

  /**
   * Handle the press event for the information icon
   */
  const [informationPopupVisible, setInformationPopupVisible] = React.useState(false);
  function handleInformationPress() {
    console.log('Information pressed');
    setInformationPopupVisible(true);
  }

  return (
    <View style={styles.utilityBelt}>
      <Pressable
        style={
          buttonHover.leaderboard
            ? { ...styles.iconShadow, ...styles.iconHover }
            : styles.iconShadow
        }
        onPointerEnter={() => handleMouseEnter('leaderboard')}
        onPointerLeave={() => handleMouseLeave('leaderboard')}
        onPress={handleLeaderBoardPress}>
        <Image style={styles.icons} source={require('../assets/images/leaderboardIcon.webp')} />
      </Pressable>
      <Text style={styles.counter}>{counter}</Text>
      <Pressable
        style={
          buttonHover.login ? { ...styles.iconShadow, ...styles.iconHover } : styles.iconShadow
        }
        onPointerEnter={() => handleMouseEnter('login')}
        onPointerLeave={() => handleMouseLeave('login')}
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
        onPointerEnter={() => handleMouseEnter('information')}
        onPointerLeave={() => handleMouseLeave('information')}
        onPress={handleInformationPress}>
        <Image
          style={styles.icons}
          resizeMode="contain"
          source={require('../assets/images/informationIcon.webp')}
        />
      </Pressable>
      <LoginPopup visible={loginPopupVisible} onClose={() => setLoginPopupVisible(false)} />
      <LeaderboardPopup
        visible={leaderboardPopupVisible}
        onClose={() => setLeaderboardPopupVisible(false)}
      />
      <InformationPopup
        visible={informationPopupVisible}
        onClose={() => setInformationPopupVisible(false)}
      />
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
