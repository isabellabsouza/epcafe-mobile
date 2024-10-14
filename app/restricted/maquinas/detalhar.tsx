import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import database, { maquinasCollection } from '@/db';
import Maquina from '@/db/model/Maquina';
import ButtonLink from '@/components/ButtonLink';
import { withObservables } from '@nozbe/watermelondb/react';
import Entypo from '@expo/vector-icons/Entypo';
import Titulo from '@/components/Titulo';
import Botao from '@/components/Botao';
import InfoLinha from '@/components/InfoLinha';


function detalharMaquina({ maquina }: { maquina: Maquina }) {

    const { id } = useLocalSearchParams();
    
    if (!maquina) {
        return <Text>Máquina não encontrada.</Text>;
    }

    const excluir = async () => {
        await database.write(async () => {
            await maquina.markAsDeleted();
        });
        console.log("Máquina excluída com sucesso.");
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Titulo titulo={maquina.nome} />

            <InfoLinha label="Nome" valor={maquina.nome} />
            <InfoLinha label="Vida Útil" valor={maquina.vida_util + " anos"} />

            {/* <Link href={{ pathname: "/restricted/maquinas/criar", params: {id: maquina.id}}} asChild>
                <TouchableOpacity>
                    <Text>Editar</Text>
                </TouchableOpacity>
            </Link>
            
            <Text>Nome: {maquina.nome}</Text>
            <Text>Vida Útil: {maquina.vida_util} anos</Text>
            <Entypo name="trash" size={24} color="black" onPress={excluir}/> */}

            <View style={styles.botoesContainer}>
                <Botao nome="Editar" rota={`/restricted/maquinas/criar?id=${id}`} />
                <Botao nome="Excluir" rota={`/restricted/maquinas/criar?id=${id}`} />
            </View>
        </ScrollView>
    );
}

const enhance = withObservables(
    ['id'], // Dependências para observar
    ({ id }: { id: string }) => {
        if (!id) {
            throw new Error("ID não encontrado.");
        }
        return {
            maquina: maquinasCollection.findAndObserve(id),
        };
    }
);

function EnhancedDetalharMaquina() {
    const { id } = useLocalSearchParams(); // Pegando o ID da máquina
    if (!id) {
        return <Text>ID da máquina não foi fornecido.</Text>;
    }

    const EnhancedComponent = enhance(detalharMaquina);
    return <EnhancedComponent id={String(id)} />;
}

export default EnhancedDetalharMaquina;

const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1, 
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15
    }
})