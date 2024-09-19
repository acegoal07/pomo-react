import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, TextInput } from 'react-native';
import { Svg, Path } from 'react-native-svg';

import { login } from '~/constants/apiMiddleMan';
import { backgroundColor, accentColor } from '~/constants/colours';

interface LoginPopupProps {
  loginVisible: boolean;
  loginOnClose: () => void;
  infoVisible: boolean;
  infoOnClose: () => void;
  user: { username: string; secureID: string };
  setUser: React.Dispatch<React.SetStateAction<{ username: string; secureID: string }>>;
  setFullPomoScore: React.Dispatch<React.SetStateAction<number>>;
  setPartialPomoScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function LoginPopup({
  loginVisible,
  loginOnClose,
  infoVisible,
  infoOnClose,
  user,
  setUser,
  setFullPomoScore,
  setPartialPomoScore,
}: Readonly<LoginPopupProps>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonHover, setButtonHover] = React.useState<{
    loginSubmitButton: boolean;
    logoutSubmitButton: boolean;
    closeButton: boolean;
  }>({
    loginSubmitButton: false,
    logoutSubmitButton: false,
    closeButton: false,
  });

  /**
   * Handle the mouse entering the button and adds the hover effect
   * @param {string} button The button that the mouse has entered
   * @returns {void}
   */
  function handleMouseEnter(button: string) {
    setButtonHover({ ...buttonHover, [button]: true });
  }

  /**
   * Handle the mouse leaving the button and removes the hover effect
   * @param {string} button The button that the mouse has left
   * @returns {void}
   */
  function handleMouseLeave(button: string) {
    setButtonHover({ ...buttonHover, [button]: false });
  }

  /**
   * Reset the form and close the modal.
   */
  function handleLoginFormResetClose() {
    setUsername('');
    setPassword('');
    loginOnClose();
  }

  /**
   * Handle the login form submission.
   */
  function handleLogin() {
    console.log('Username:', username);
    console.log('Password:', password);
    login(username, password).then((response) => {
      if (response.success) {
        localStorage.setItem('username', username);
        localStorage.setItem('secureID', response.secureID);
        setUser({ username, secureID: response.secureID });
        setFullPomoScore(response.fullPomoScore);
        setPartialPomoScore(response.partialPomoScore);
        handleLoginFormResetClose();
      } else {
        // Handle the error
      }
    });
  }

  /**
   * Handle the logout event.
   */
  function handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('secureID');
    setUser({ username: '', secureID: '' });
    setFullPomoScore(0);
    setPartialPomoScore(0);
    infoOnClose();
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent
        visible={loginVisible}
        onRequestClose={handleLoginFormResetClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login</Text>
            <Pressable
              style={
                buttonHover.closeButton
                  ? { ...styles.closeButton, ...styles.closeButtonHover }
                  : styles.closeButton
              }
              onPointerEnter={() => handleMouseEnter('closeButton')}
              onPointerLeave={() => handleMouseLeave('closeButton')}
              onPress={loginOnClose}>
              <Svg viewBox="0 0 384 512" style={styles.closeButtonText} fill="white">
                <Path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </Svg>
            </Pressable>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Pressable
                style={
                  buttonHover.loginSubmitButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={handleLogin}
                onPointerEnter={() => handleMouseEnter('loginSubmitButton')}
                onPointerLeave={() => handleMouseLeave('loginSubmitButton')}>
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent visible={infoVisible} onRequestClose={infoOnClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Information</Text>
            <Pressable
              style={
                buttonHover.closeButton
                  ? { ...styles.closeButton, ...styles.closeButtonHover }
                  : styles.closeButton
              }
              onPointerEnter={() => handleMouseEnter('closeButton')}
              onPointerLeave={() => handleMouseLeave('closeButton')}
              onPress={infoOnClose}>
              <Svg viewBox="0 0 384 512" style={styles.closeButtonText} fill="white">
                <Path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </Svg>
            </Pressable>
            <Pressable
              style={
                buttonHover.logoutSubmitButton
                  ? { ...styles.submit, ...styles.submitButtonHover }
                  : styles.submit
              }
              onPress={handleLogout}
              onPointerEnter={() => handleMouseEnter('logoutSubmitButton')}
              onPointerLeave={() => handleMouseLeave('logoutSubmitButton')}>
              <Text style={styles.submitText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    minWidth: 250,
    maxWidth: 600,
    padding: 20,
    backgroundColor,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: accentColor,
    width: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  closeButton: {
    top: 18,
    right: 18,
    padding: 4,
    backgroundColor: accentColor,
    borderRadius: 5,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  closeButtonHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
  },
  closeButtonText: {
    height: 30,
    width: 30,
  },
  form: {
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
  },
  submit: {
    padding: 10,
    backgroundColor: accentColor,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  submitButtonHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});