import { StyleSheet, View, Text } from 'react-native';

export default function Overview() {
   return (
      <View style={styles.container}>
         <Text>Pomo</Text>
      </View>
   );
}

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
   },
});
