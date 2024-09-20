import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import UtilityBelt from '../components/utilitybelt';
import { backgroundColor } from '../constants/colours';

import Timer from '~/components/timer';
import Todos from '~/components/todos';
import { getPomoScore, getTodos } from '~/constants/apiMiddleMan';

export default function Pomo() {
  const [partialPomoScore, setPartialPomoScore] = React.useState(0);
  const [fullPomoScore, setFullPomoScore] = React.useState(0);
  const [pageLayout, setPageLayout] = React.useState(true);
  const [todoList, setTodoList] = React.useState<{ taskID: number; taskContent: string }[]>([]);
  const [user, setUser] = React.useState({ username: '', secureID: '' });
  const windowDimensions = useWindowDimensions();

  /**
   * Reset the pomo count and increment the counter when the pomo count reaches 8
   */
  React.useEffect(() => {
    if (partialPomoScore === 8) {
      setPartialPomoScore(0);
      setFullPomoScore((prev) => prev + 1);
    }
  }, [partialPomoScore]);

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

  /**
   * Get the user's username and secureID from the local storage
   */
  React.useEffect(() => {
    const username = localStorage.getItem('username');
    const secureID = localStorage.getItem('secureID');
    if (username && secureID) {
      setUser({ username, secureID });
      getPomoScore(username, secureID).then((response) => {
        if (response.success) {
          setFullPomoScore(response.fullPomoScore);
          setPartialPomoScore(response.partialPomoScore);
        }
      });
    }
  }, []);

  /**
   * Get the user's todos from the database when the user changes
   */
  React.useEffect(() => {
    if (user.username && user.secureID) {
      getTodos(user.username, user.secureID).then((response) => {
        if (response.success) {
          console.log(response.todos);
          setTodoList(response.todos);
        }
      });
    }
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.bodyContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../assets/images/pomoLogo.webp')}
        />
      </View>
      <UtilityBelt
        fullPomoScore={fullPomoScore}
        setFullPomoScore={setFullPomoScore}
        partialPomoScore={partialPomoScore}
        setPartialPomoScore={setPartialPomoScore}
        user={user}
        setUser={setUser}
      />
      <SafeAreaView
        style={[styles.componentsContainer, pageLayout ? styles.rowLayout : styles.columnLayout]}>
        <Timer setPartialPomoScore={setPartialPomoScore} user={user} />
        <Todos todoList={todoList} setTodoList={setTodoList} user={user} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor,
    padding: 20,
    paddingTop: 10,
    flexGrow: 1,
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
    flexShrink: 1,
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
