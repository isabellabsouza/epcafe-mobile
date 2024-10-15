import { Button, Text, View, StyleSheet } from 'react-native';

import Card from '@/components/Card';
import { mySync } from '@/db/sync';
import { Stack } from 'expo-router';
import Titulo from '@/components/Titulo';
import Subtitulo from '@/components/Subtitulo';

const cards = [
  {
    titulo: 'Máquinas e Implementos',
    rota: 'restricted/maquinas'
  },
  {
    titulo: "Despesas com Máquinas",
    rota: 'restricted/maquinas'
  },
  {
    titulo: "Despesas com Fertilizantes e Defensivos",
    rota: 'restricted/maquinas'
  }
]
export default function HomeScreen() {
  return (
    <View style={styles.appContainer}>

      <Titulo titulo="Bem vindo usuário!"></Titulo>
      <Subtitulo subtitulo="Gerenciar propriedade"></Subtitulo>
      <View style={styles.cardsContainer}>
        {
          cards.map((card, index) => (
            <Card key={index} titulo={card.titulo} rota={card.rota} />
          ))
        }
      </View>
      <Button title='sync' onPress={mySync} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 17,

  },
  cardsContainer: {
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
})