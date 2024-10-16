// import Subtitulo from "@/components/Subtitulo";
// import Titulo from "@/components/Titulo";
// import { Link, router } from "expo-router";
// import { FlatList, Text, StyleSheet, View, TouchableOpacity } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { unidadesCollection } from "@/db";


// export default function SelecionarUnidade() {
    
//     function escolherUnidade({unidade}: {unidade: string}) {

//         AsyncStorage
//             .setItem('unidade', unidade)
//             .then(() => {
//                 console.log('Unidade selecionada:', unidade)
//                 router.push('/restricted')
//             })
//     }
    
    
//         const unidades = [
//         {
//             nome: 'Fazenda São José'
//         },
//         {
//             nome: 'Fazenda São Pedro'
//         },
//         {
//             nome: 'Fazenda São João'
//         },
//         {
//             nome: 'Fazenda São Paulo'
//         }

//     ]

//     return (
//         <View> 
//             <Titulo titulo="Olá Usuário!" />
//             <Subtitulo subtitulo="Em qual propriedade você pretende trabalhar hoje?" />

//             <View style={styles.unidadesContainer}>
//                 <FlatList 
//                     data={unidades}
//                     renderItem={({item}) => (
//                             <TouchableOpacity >
//                         <Link href="/restricted" style={styles.unidadeCard}>
//                                 <Text style={styles.unidadeCardText}>{item.nome}</Text>
//                         </Link>
//                             </TouchableOpacity>
//                     )}
//                     keyExtractor={(item) => item.nome}
//                 />
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     unidadesContainer:{
//         backgroundColor: "#D9D9D9",
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 50,
//         paddingVertical: 43,
//         paddingHorizontal: 17,
        
//     },
//     unidadeCard: {
//         backgroundColor: "#adabab",
//         borderRadius: 20,
//         paddingVertical: 12,
//         paddingHorizontal: 75,
//         marginTop: 10
//     },
//     unidadeCardText: {
//         fontSize: 20
//     }
// })

import React, { useEffect, useState } from "react";
import Subtitulo from "@/components/Subtitulo";
import Titulo from "@/components/Titulo";
import { Link, router } from "expo-router";
import { FlatList, Text, StyleSheet, View, TouchableOpacity, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import database, { unidadesCollection } from "@/db"; // Coleção do WatermelonDB
import Unidade from "@/db/model/Unidade";
import { Q } from "@nozbe/watermelondb";
import { supabase } from "@/lib/supabase";

export default function SelecionarUnidade() {
  const [unidades, setUnidades] = useState<Unidade[]>([]); // Estado para armazenar as unidades
  const [loading, setLoading] = useState(true); // Estado de loading

  // Função para buscar as unidades do WatermelonDB
  useEffect(() => {
    async function fetchUnidades() {
        //supabase.auth.getSession
      try {
        const resultado = await unidadesCollection.query().fetch(); // Busca todas as unidades
            
        console.log("Unidades carregadas:", resultado);
        setUnidades(resultado); // Atualiza o estado com os dados
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
      }
    }

    fetchUnidades();
  }, []);

  function escolherUnidade(unidade: Unidade) {
    AsyncStorage.setItem("unidade", unidade.id)
      .then(() => {
        console.log("Unidade selecionada:", unidade.nome);
        router.push("/restricted");
      })
      .catch((error) => console.error("Erro ao salvar unidade:", error));
  }

  return (
    <View >
      <Titulo titulo="Olá Usuário!" />
      <Subtitulo subtitulo="Em qual propriedade você pretende trabalhar hoje?" />
      <View style={styles.unidadesContainer}>
        {unidades.length > 0 ? (
          <FlatList
            data={unidades}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => escolherUnidade(item)}>
                <View style={styles.unidadeCard}>
                  <Text style={styles.unidadeCardText}>{item.nome}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text >Carregando unidades...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  unidadesContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    paddingVertical: 43,
    paddingHorizontal: 17,
  },
  unidadeCard: {
    backgroundColor: "#adabab",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 75,
    marginTop: 10,
  },
  unidadeCardText: {
    fontSize: 20,
  },
});
