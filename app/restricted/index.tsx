import {Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import Card from '@/components/Card';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
      <Card route="restricted/maquinas" title="Máquinas" />
    </View>
  );
}