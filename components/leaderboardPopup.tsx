import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';

import { backgroundColor, accentColor } from '~/constants/colours';

interface LeaderboardPopupProps {
  visible: boolean;
  onClose: () => void;
}

export default function LeaderboardPopup({ visible, onClose }: Readonly<LeaderboardPopupProps>) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Leaderboard</Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
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
    backdropFilter: 'blur(10px)',
  },
  modalContent: {
    width: '80%',
    height: '80%',
    padding: 20,
    backgroundColor,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    border: `5px solid ${accentColor}`,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  closeButton: {
    top: 10,
    right: 20,
    padding: 10,
    backgroundColor: accentColor,
    borderRadius: 5,
    position: 'absolute',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
