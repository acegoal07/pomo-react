import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';

import { backgroundColor, accentColor } from '~/constants/colours';

interface InformationPopupProps {
  visible: boolean;
  onClose: () => void;
}

export default function IInformationPopup({ visible, onClose }: Readonly<InformationPopupProps>) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Information</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Svg viewBox="0 0 384 512" style={styles.closeButtonText} fill="white">
              <Path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </Svg>
          </Pressable>
        </View>
      </View>
    </Modal>
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
    padding: 20,
    backgroundColor,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: accentColor,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  closeButton: {
    top: 10,
    right: 10,
    padding: 2,
    backgroundColor: accentColor,
    borderRadius: 5,
    position: 'absolute',
  },
  closeButtonText: {
    height: 30,
    width: 30,
  },
});
