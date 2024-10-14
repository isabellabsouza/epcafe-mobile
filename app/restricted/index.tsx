import { Button, Text, View, StyleSheet } from 'react-native';

import Card from '@/components/Card';
import { mySync } from '@/db/sync';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.appContainer}>
      
      <Text>Home</Text>
      <Card rota="restricted/maquinas" titulo="Máquinas" />
      <Button title='sync' onPress={mySync} />
    </View>
  );
}

const styles = StyleSheet.create ({
  appContainer: {
      padding: 17,
      
  }
})