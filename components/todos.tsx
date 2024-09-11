import { Text, StyleSheet, View, Pressable } from 'react-native';

import { accentColor, foregroundColor } from '~/constants/colours';

export default function Todos() {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>Todos</Text>
      <Pressable style={styles.addTodoButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style={styles.addTodoButtonText}>
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
      </Pressable>
      <View style={styles.todoItem}>
        <Text style={styles.todoItemText}>Todo item will be here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: foregroundColor,
    padding: 20,
    borderRadius: 10,
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 60,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowRadius: 6,
  },
  addTodoButton: {
    backgroundColor: accentColor,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: 50,
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.5)',
  },
  addTodoButtonText: {
    fill: 'white',
    width: 30,
    height: 30,
  },
  todoItem: {
    width: '100%',
    backgroundColor: accentColor,
    padding: 15,
    borderRadius: 10,
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.5)',
  },
  todoItemText: {
    color: 'white',
    fontSize: 24,
  },
});
