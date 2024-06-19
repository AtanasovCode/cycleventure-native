import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from './useStore';

export default function App() {

  const bears = useStore((state) => state.bears);

  return (
    <View className="bg-slate-900 flex-1 items-center justify-center">
      <Text className="text-slate-100 text-center font-bold text-xl">Bears: {bears}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
