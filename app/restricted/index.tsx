import { Button, StyleSheet, View } from 'react-native';

import Card from '@/components/Card';
import Subtitulo from '@/components/Subtitulo';
import Titulo from '@/components/Titulo';
import { mySync } from '@/db/sync';


const cards = [
  {
    titulo: 'Máquinas e Implementos',
    rota: 'restricted/maquinas'
  },
  {
    titulo: 'Fertilizantes e Defensivos',
    rota: 'restricted/fertilizantes'
  },
  {
    titulo: "Despesas com Máquinas",
    rota: 'restricted/despesaMaquina'
  },
  {
    titulo: "Despesas com Fertilizantes e Defensivos",
    rota: 'restricted/maquinas'
  }
]

const test = async () => {
  // let filter = [
  //   'id',
  //   'created_at',
  //   'updated_at',
  //   'deleted_at',
  // ]
  // fertilizantesCollection
  //   .query()
  //   .fetch()
  //   .then(f => {
  //     let fields = f[0].asModel._raw;
  //     console.log(Object.keys(fields).filter(key => !key.match(/^_.*/)).filter(key => !filter.includes(key)))
  //     // for(let i = 0; i < fields)
  //   })
  // // console.log('testing 1')
  // // await database.write(async () => {
  // //   console.log('testing 2')
  // //   await fertilizantesCollection.create(fertilizante => {
  // //     fertilizante.nome = 'Fertilizante 1';
  // //     fertilizante.tipo = 'Fertilizante';
  // //   })
  // // })
  //   console.log(
  //     fertilizantesCollection.schema.columns
  //   )


}

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