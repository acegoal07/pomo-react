import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { getPomoScore, getTodos, updatePomoScore } from '~/constants/apiMiddleMan';

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
      checkPomoScoresMatch().then(() => {
        setPartialPomoScore(0);
        setFullPomoScore((prev) => prev + 1);
        updatePomoScore(user.username, user.secureID, partialPomoScore, fullPomoScore);
      });
    }
  }, [partialPomoScore]);

  /**
   * Check if the pomo scores match the database and if not make them match
   */
  async function checkPomoScoresMatch() {
    getPomoScore(user.username, user.secureID).then((response) => {
      if (response.success) {
        if (response.fullPomoScore !== fullPomoScore) {
          setFullPomoScore(response.fullPomoScore);
        }
        if (response.partialPomoScore !== partialPomoScore) {
          setPartialPomoScore(response.partialPomoScore);
        }
      }
    });
  }

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
    AsyncStorage.multiGet(['username', 'secureID']).then((response) => {
      const username = response[0][1];
      const secureID = response[1][1];
      if (username && secureID) {
        setUser({ username, secureID });
        getPomoScore(username, secureID).then((response) => {
          if (response.success) {
            setFullPomoScore(response.fullPomoScore);
            setPartialPomoScore(response.partialPomoScore);
          }
        });
      }
    });
  }, []);

  /**
   * Get the user's todos from the database when the user changes
   */
  React.useEffect(() => {
    if (user.username && user.secureID) {
      getTodos(user.username, user.secureID).then((response) => {
        if (response.success) {
          setTodoList(response.todos);
        }
      });
    } else if (user.username === '' && user.secureID === '') {
      setTodoList([]);
    }
  }, [user]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.bodyContainer}>
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
    overflow: 'scroll',
  },
  logoContainer: {
    maxHeight: 150,
    height: '80%',
    maxWidth: 437,
    width: '80%',
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
