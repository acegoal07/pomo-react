import React from 'react';
import { StyleSheet, View, Image, useWindowDimensions, ScrollView } from 'react-native';

import UtilityBelt from '../components/utilitybelt';
import { backgroundColor } from '../constants/colours';

import Timer from '~/components/timer';
import Todos from '~/components/todos';

export default function Pomo() {
  const [pomoCount, setPomoCount] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [pageLayout, setPageLayout] = React.useState(true);
  const [todoList, setTodoList] = React.useState<{ id: number; todo: string }[]>([]);
  const windowDimensions = useWindowDimensions();

  /**
   * Reset the pomo count and increment the counter when the pomo count reaches 8
   */
  React.useEffect(() => {
    if (pomoCount === 8) {
      setPomoCount(0);
      setCounter((prev) => prev + 1);
    }
  }, [pomoCount]);

  /**
   * Get the window dimensions
   */
  React.useEffect(() => {
    if (windowDimensions.width < 1400) {
      setPageLayout(false);
    } else {
      setPageLayout(true);
    }
  }, [windowDimensions.width]);

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../assets/images/pomoLogo.webp')}
        />
      </View>
      <UtilityBelt counter={counter} setCounter={setCounter} />
      <ScrollView
        contentContainerStyle={[
          styles.componentsContainer,
          pageLayout ? styles.rowLayout : styles.columnLayout,
        ]}>
        <Timer pomoCounter={pomoCount} setPomoCounter={setPomoCount} />
        <Todos todoList={todoList} setTodoList={setTodoList} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor,
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  logoContainer: {
    maxHeight: 170,
    height: '100%',
    maxWidth: 457,
    width: '100%',
    alignSelf: 'center',
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  componentsContainer: {
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  rowLayout: {
    flexDirection: 'row',
    gap: 200,
    marginLeft: 80,
    marginRight: 80,
    width: '80%',
  },
  columnLayout: {
    flexDirection: 'column',
    gap: 30,
    width: '100%',
  },
});
