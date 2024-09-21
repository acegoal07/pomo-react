import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, TextInput } from 'react-native';
import { Svg, Path } from 'react-native-svg';

import { changePassword, login, register } from '~/constants/apiMiddleMan';
import { backgroundColor, accentColor } from '~/constants/colours';

export default function LoginPopup({
  loginVisible,
  loginOnClose,
  loginOnShow,
  registerVisible,
  registerOnClose,
  registerOnShow,
  infoVisible,
  infoOnClose,
  infoOnShow,
  changePasswordVisible,
  changePasswordOnClose,
  changePasswordOnShow,
  user,
  setUser,
  setFullPomoScore,
  setPartialPomoScore,
}: Readonly<{
  loginVisible: boolean;
  loginOnClose: () => void;
  loginOnShow: () => void;
  registerVisible: boolean;
  registerOnClose: () => void;
  registerOnShow: () => void;
  infoVisible: boolean;
  infoOnClose: () => void;
  infoOnShow: () => void;
  changePasswordVisible: boolean;
  changePasswordOnClose: () => void;
  changePasswordOnShow: () => void;
  user: { username: string; secureID: string };
  setUser: React.Dispatch<React.SetStateAction<{ username: string; secureID: string }>>;
  setFullPomoScore: React.Dispatch<React.SetStateAction<number>>;
  setPartialPomoScore: React.Dispatch<React.SetStateAction<number>>;
}>) {
  const [buttonHover, setButtonHover] = React.useState<{
    loginSubmitButton: boolean;
    logoutSubmitButton: boolean;
    changePasswordSubmitButton: boolean;
    changeInfoPageButton: boolean;
    switchToRegisterButton: boolean;
    closeButton: boolean;
  }>({
    loginSubmitButton: false,
    logoutSubmitButton: false,
    changePasswordSubmitButton: false,
    changeInfoPageButton: false,
    switchToRegisterButton: false,
    closeButton: false,
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = React.useState('');
  const [changePasswordOld, setChangePasswordOld] = React.useState('');
  const [changePasswordNew, setChangePasswordNew] = React.useState('');
  const [changePasswordConfirm, setChangePasswordConfirm] = React.useState('');

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
    loginOnClose();
    setLoginUsername('');
    setLoginPassword('');
  }

  /**
   * Handle the login form submission.
   */
  function handleLogin() {
    login(loginUsername, loginPassword).then((response) => {
      if (response.success) {
        handleLoginFormResetClose();
        localStorage.setItem('username', loginUsername);
        localStorage.setItem('secureID', response.secureID);
        setUser({ username: loginUsername, secureID: response.secureID });
        setFullPomoScore(response.fullPomoScore);
        setPartialPomoScore(response.partialPomoScore);
      } else {
        // Handle the error
      }
    });
    setLoginUsername('');
    setLoginPassword('');
  }

  /**
   * Handle the logout event.
   */
  function handleLogout() {
    infoOnClose();
    localStorage.removeItem('username');
    localStorage.removeItem('secureID');
    setUser({ username: '', secureID: '' });
    setFullPomoScore(0);
    setPartialPomoScore(0);
  }

  /**
   * Handle the switch to register event
   */
  function handleSwitchToRegister() {
    if (loginVisible) {
      loginOnClose();
      registerOnShow();
      setLoginUsername('');
      setLoginPassword('');
    } else {
      registerOnClose();
      loginOnShow();
      setLoginUsername('');
      setLoginPassword('');
    }
  }

  /**
   * Handle the register event
   */
  function handleRegister() {
    register(registerUsername, registerPassword, registerConfirmPassword).then((response) => {
      if (response.success) {
        registerOnClose();
        localStorage.setItem('username', registerUsername);
        localStorage.setItem('secureID', response.secureID);
        setUser({ username: registerUsername, secureID: response.secureID });
      }
    });
    setRegisterUsername('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
  }

  function handleRegisterOnCloseRest() {
    registerOnClose();
    setRegisterUsername('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
  }

  /**
   * Handle the switch account info view event.
   */
  function handleSwitchAccountInfoView() {
    if (changePasswordVisible) {
      infoOnShow();
      changePasswordOnClose();
      setChangePasswordOld('');
      setChangePasswordNew('');
      setChangePasswordConfirm('');
    } else {
      infoOnClose();
      changePasswordOnShow();
      setLoginUsername('');
      setLoginPassword('');
    }
  }

  /**
   * Handle the change popup close event.
   */
  function handleChangePasswordClose() {
    changePasswordOnClose();
    setChangePasswordOld('');
    setChangePasswordNew('');
    setChangePasswordConfirm('');
  }

  /**
   * Handle the change password event
   */
  function handleChangePassword() {
    changePassword(
      user.username,
      user.secureID,
      changePasswordOld,
      changePasswordNew,
      changePasswordConfirm
    ).then((response) => {
      if (response.success) {
        handleChangePasswordClose();
      } else {
        // Handle the error
      }
    });
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
                value={loginUsername}
                onChangeText={setLoginUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={loginPassword}
                onChangeText={setLoginPassword}
                secureTextEntry
              />
              <Pressable
                style={
                  buttonHover.switchToRegisterButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={handleSwitchToRegister}
                onPointerEnter={() => handleMouseEnter('switchToRegisterButton')}
                onPointerLeave={() => handleMouseLeave('switchToRegisterButton')}>
                <Text style={styles.submitText}>Register account</Text>
              </Pressable>
              <Pressable
                style={
                  buttonHover.loginSubmitButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={handleLogin}
                onPointerEnter={() => handleMouseEnter('loginSubmitButton')}
                onPointerLeave={() => handleMouseLeave('loginSubmitButton')}>
                <Text style={styles.submitText}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={registerVisible}
        onRequestClose={handleRegisterOnCloseRest}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register</Text>
            <Pressable
              style={
                buttonHover.closeButton
                  ? { ...styles.closeButton, ...styles.closeButtonHover }
                  : styles.closeButton
              }
              onPointerEnter={() => handleMouseEnter('closeButton')}
              onPointerLeave={() => handleMouseLeave('closeButton')}
              onPress={handleRegisterOnCloseRest}>
              <Svg viewBox="0 0 384 512" style={styles.closeButtonText} fill="white">
                <Path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </Svg>
            </Pressable>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={registerUsername}
                onChangeText={setRegisterUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={registerPassword}
                onChangeText={setRegisterPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={registerConfirmPassword}
                onChangeText={setRegisterConfirmPassword}
                secureTextEntry
              />
              <Pressable
                style={
                  buttonHover.loginSubmitButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={handleSwitchToRegister}
                onPointerEnter={() => handleMouseEnter('loginSubmitButton')}
                onPointerLeave={() => handleMouseLeave('loginSubmitButton')}>
                <Text style={styles.submitText}>Login to account</Text>
              </Pressable>
              <Pressable
                style={
                  buttonHover.loginSubmitButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={handleRegister}
                onPointerEnter={() => handleMouseEnter('loginSubmitButton')}
                onPointerLeave={() => handleMouseLeave('loginSubmitButton')}>
                <Text style={styles.submitText}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={infoVisible} onRequestClose={infoOnClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Account Management</Text>
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
            <View style={styles.form}>
              <Pressable
                style={
                  buttonHover.changeInfoPageButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={() => handleSwitchAccountInfoView()}
                onPointerEnter={() => handleMouseEnter('changeInfoPageButton')}
                onPointerLeave={() => handleMouseLeave('changeInfoPageButton')}>
                <Text style={styles.submitText}>Change Password</Text>
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
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={changePasswordVisible}
        onRequestClose={handleChangePasswordClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <Pressable
              style={
                buttonHover.closeButton
                  ? { ...styles.closeButton, ...styles.closeButtonHover }
                  : styles.closeButton
              }
              onPointerEnter={() => handleMouseEnter('closeButton')}
              onPointerLeave={() => handleMouseLeave('closeButton')}
              onPress={handleChangePasswordClose}>
              <Svg viewBox="0 0 384 512" style={styles.closeButtonText} fill="white">
                <Path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </Svg>
            </Pressable>
            <View style={styles.form}>
              <Pressable
                style={
                  buttonHover.changeInfoPageButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={() => handleSwitchAccountInfoView()}
                onPointerEnter={() => handleMouseEnter('changeInfoPageButton')}
                onPointerLeave={() => handleMouseLeave('changeInfoPageButton')}>
                <Text style={styles.submitText}>Back</Text>
              </Pressable>
              <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={changePasswordOld}
                onChangeText={setChangePasswordOld}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={changePasswordNew}
                onChangeText={setChangePasswordNew}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={changePasswordConfirm}
                onChangeText={setChangePasswordConfirm}
                secureTextEntry
              />
              <Pressable
                style={
                  buttonHover.changePasswordSubmitButton
                    ? { ...styles.submit, ...styles.submitButtonHover }
                    : styles.submit
                }
                onPress={() => handleChangePassword()}
                onPointerEnter={() => handleMouseEnter('changePasswordSubmitButton')}
                onPointerLeave={() => handleMouseLeave('changePasswordSubmitButton')}>
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
            </View>
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
