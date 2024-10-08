import React from 'react';
import { Text, StyleSheet, View, Pressable, FlatList } from 'react-native';
import CheckBox from 'react-native-bouncy-checkbox';
import { Svg, Path } from 'react-native-svg';

import AddTodoPopup from './addTodoPopup';
import EditTodoPopup from './editTodoPopup';

import { deleteTodo } from '~/constants/apiMiddleMan';
import { accentColor, foregroundColor } from '~/constants/colours';

export default function Todos({
  todoList,
  setTodoList,
  user,
}: Readonly<{
  todoList: { taskID: number; taskContent: string }[];
  setTodoList: React.Dispatch<React.SetStateAction<{ taskID: number; taskContent: string }[]>>;
  user: { username: string; secureID: string };
}>) {
  const [buttonHover, setButtonHover] = React.useState<{ add: boolean }>({
    add: false,
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

  const [addTodoPopupVisible, setAddTodoPopupVisible] = React.useState(false);
  /**
   * Handle the press event for the add todo button
   */
  function handleAddTodoPress() {
    if (user.username === '' && user.secureID === '') {
      return;
    }
    setAddTodoPopupVisible(true);
  }

  const [editTodoPopupVisible, setEditTodoPopupVisible] = React.useState(false);
  const [editTaskId, setEditTaskId] = React.useState(0);
  const [editTaskContent, setEditTaskContent] = React.useState('');
  /**
   * Handle the press event for the edit todo button
   */
  function handleEditTodoPress(item: { taskID: number; taskContent: string }) {
    setEditTaskId(item.taskID);
    setEditTaskContent(item.taskContent);
    setEditTodoPopupVisible(true);
  }

  /**
   * Handle the press event for the delete todo button
   * @param {{taskID: number; taskContent: string}} item The todo item to delete
   */
  function handleDeleteTodoPress(item: { taskID: number; taskContent: string }) {
    deleteTodo(user.username, user.secureID, item.taskID).then((response) => {
      if (response.success) {
        setTodoList((prev) => prev.filter((todo) => todo.taskID !== item.taskID));
      }
    });
  }

  /**
   * Render the todo item
   * @param {ListRenderItemInfo<{ taskID: number, taskContent: string }>} info The todo item info to render
   * @returns {JSX.Element} The JSX element for the todo item
   */
  function renderTodoItem({
    item,
  }: {
    item: { taskID: number; taskContent: string };
  }): JSX.Element {
    return (
      <View style={styles.todoItem}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            size={40}
            fillColor="transparent"
            iconImageStyle={{ tintColor: 'white', width: 30, height: 30 }}
            innerIconStyle={{ borderRadius: 5, borderColor: 'white', borderWidth: 2 }}
            onPress={() => handleDeleteTodoPress(item)}
          />
        </View>
        <Text style={styles.todoItemText} onPress={() => handleEditTodoPress(item)}>
          {item.taskContent}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.title}>Todos</Text>
      <Pressable
        style={
          buttonHover.add ? [styles.addTodoButton, styles.addTodoButtonHover] : styles.addTodoButton
        }
        onPointerEnter={() => handleMouseEnter('add')}
        onPointerLeave={() => handleMouseLeave('add')}
        onPress={handleAddTodoPress}>
        <Svg viewBox="0 0 448 512" style={styles.addTodoButtonText} fill="white">
          <Path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </Svg>
      </Pressable>
      <FlatList
        data={todoList}
        renderItem={renderTodoItem}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            {user.username === '' && user.secureID === ''
              ? 'Login to create todo items'
              : 'No todos to display'}
          </Text>
        }
      />
      <AddTodoPopup
        visible={addTodoPopupVisible}
        onClose={() => setAddTodoPopupVisible(false)}
        user={user}
        setTodoList={setTodoList}
      />
      <EditTodoPopup
        visible={editTodoPopupVisible}
        onClose={() => setEditTodoPopupVisible(false)}
        user={user}
        setTodoList={setTodoList}
        taskID={editTaskId}
        taskContent={editTaskContent}
        setTaskContent={setEditTaskContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: foregroundColor,
    padding: 20,
    borderRadius: 10,
    maxHeight: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
    flex: 1,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginBottom: 20,
    width: 50,
  },
  addTodoButtonHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
  },
  addTodoButtonText: {
    width: 30,
    height: 30,
  },
  todoItem: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: accentColor,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 9,
  },
  todoItemText: {
    color: 'white',
    fontSize: 24,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    flex: 1,
  },
  checkBoxContainer: {
    justifyContent: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  emptyListText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowRadius: 6,
  },
});
