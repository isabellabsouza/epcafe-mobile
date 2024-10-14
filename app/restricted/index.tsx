import { Button, Text, View } from 'react-native';

import Card from '@/components/Card';
import { mySync } from '@/db/sync';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
      <Card rota="restricted/maquinas" titulo="Máquinas" />
      <Button title='sync' onPress={mySync} />
    </View>
  );
}