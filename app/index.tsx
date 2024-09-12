import React from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';

import UtilityBelt from '../components/utilitybelt';
import { backgroundColor } from '../constants/colours';

import Timer from '~/components/timer';
import Todos from '~/components/todos';

export default function Pomo() {
  const [pomoCount, setPomoCount] = React.useState(0);
  const [counter, setCounter] = React.useState(0);
  const [pageLayout, setPageLayout] = React.useState('row');
  const [todoList, setTodoList] = React.useState<{ id: number; todo: string }[]>([]);

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
    if (window.innerWidth < 1400) {
      setPageLayout('column');
    } else {
      setPageLayout('row');
    }
  }, [useWindowDimensions().width]);

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
      <View
        style={{
          ...styles.componentsContainer,
          flexDirection: pageLayout === 'row' ? 'row' : 'column',
          marginRight: pageLayout === 'row' ? 80 : 0,
          marginLeft: pageLayout === 'row' ? 80 : 0,
          gap: pageLayout === 'row' ? 200 : 30,
        }}>
        <Timer pomoCounter={pomoCount} setPomoCounter={setPomoCount} />
        <Todos todoList={todoList} setTodoList={setTodoList} />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor,
    flex: 1,
    padding: 20,
    paddingTop: 10,
    overflow: 'scroll',
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
    gap: 200,
    marginTop: 20,
  },
});
