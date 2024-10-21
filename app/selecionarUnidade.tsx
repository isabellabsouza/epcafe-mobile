import Subtitulo from "@/components/Subtitulo";
import Titulo from "@/components/Titulo";
import { unidadesCollection } from "@/db"; // Coleção do WatermelonDB
import Unidade from "@/db/model/Unidade";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SelecionarUnidade() {
  const [unidades, setUnidades] = useState<Unidade[]>([]); // Estado para armazenar as unidades
  const [loading, setLoading] = useState(true); // Estado de loading

  
  useEffect(() => {
    async function fetchUnidades() {
        //TODO: Buscas as unidades para o tenant do usuario logado
      try {
        const resultado = await unidadesCollection.query().fetch();
            
        console.log("Unidades carregadas:", resultado);
        setUnidades(resultado); 
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
    <View style={styles.container}>
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
    padding: 20
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
