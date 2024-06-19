import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from './useStore';

export default function App() {

  const bears = useStore((state) => state.bears);

  return (
    <View style={styles.container}>
      <Text>Bears: {bears}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
