import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import LoginPopup from './accountPopup';
import InformationPopup from './informationPopup';
import LeaderboardPopup from './leaderboardPopup';
import { accentColor } from '../constants/colours';

interface UtilityBeltProps {
  fullPomoScore: number;
  setFullPomoScore: React.Dispatch<React.SetStateAction<number>>;
  setPartialPomoScore: React.Dispatch<React.SetStateAction<number>>;
  user: { username: string; secureID: string };
  setUser: React.Dispatch<React.SetStateAction<{ username: string; secureID: string }>>;
}

export default function UtilityBelt({
  fullPomoScore,
  setFullPomoScore,
  setPartialPomoScore,
  user,
  setUser,
}: Readonly<UtilityBeltProps>) {
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
    setLeaderboardPopupVisible(true);
  }

  /**
   * Handle the press event for the login icon
   */
  const [accountPopupInfoView, setAccountPopupInfoView] = React.useState(false);
  const [accountPopupRegisterView, setAccountPopupRegisterView] = React.useState(false);
  const [accountPopupChangePasswordView, setAccountPopupChangePasswordView] = React.useState(false);
  const [accountPopupLoginView, setAccountPopupLoginView] = React.useState(false);
  function handleAccountPress() {
    if (user.username === '' && user.secureID === '') {
      setAccountPopupLoginView(true);
    } else {
      setAccountPopupInfoView(true);
    }
  }

  /**
   * Handle the press event for the information icon
   */
  const [informationPopupVisible, setInformationPopupVisible] = React.useState(false);
  function handleInformationPress() {
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
      <Text style={styles.counter}>{fullPomoScore}</Text>
      <Pressable
        style={
          buttonHover.login ? { ...styles.iconShadow, ...styles.iconHover } : styles.iconShadow
        }
        onPointerEnter={() => handleMouseEnter('login')}
        onPointerLeave={() => handleMouseLeave('login')}
        onPress={handleAccountPress}>
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
      <LoginPopup
        loginVisible={accountPopupLoginView}
        loginOnClose={() => setAccountPopupLoginView(false)}
        loginOnShow={() => setAccountPopupLoginView(true)}
        infoVisible={accountPopupInfoView}
        infoOnClose={() => setAccountPopupInfoView(false)}
        infoOnShow={() => setAccountPopupInfoView(true)}
        changePasswordVisible={accountPopupChangePasswordView}
        changePasswordOnClose={() => setAccountPopupChangePasswordView(false)}
        changePasswordOnShow={() => setAccountPopupChangePasswordView(true)}
        user={user}
        setUser={setUser}
        setFullPomoScore={setFullPomoScore}
        setPartialPomoScore={setPartialPomoScore}
      />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  iconHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
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
