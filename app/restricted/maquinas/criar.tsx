import Botao from "@/components/Botao";
import Input from "@/components/Input";
import Titulo from "@/components/Titulo";
import database, { maquinasCollection } from "@/db";
import Maquina from "@/db/model/Maquina";
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, ScrollView } from "react-native";

export default function CriarMaquina() {
    const { id } = useLocalSearchParams();
    const [nome, setNome] = useState('');
    const [vida_util, setVida_util] = useState('');
    const [maquina, setMaquina] = useState<Maquina>();

    const camposMaquina = [
        {
            label: 'Nome',
            placeholder: 'Informe o nome da máquina',
        },
        {
            label: 'Vida Útil',
            placeholder: 'Informe a vida útil em anos',
        }
    ]

    useEffect(() => {
        if (id) {
            const fetchMaquina = async () => {
                try {
                    const maquinaEncontrada = await maquinasCollection.find(String(id)); // Certifique-se de que o 'id' é uma string
                    setMaquina(maquinaEncontrada);
                    setNome(maquinaEncontrada.nome);  // Preencha o estado com os dados da máquina existente
                    setVida_util(maquinaEncontrada.vida_util.toString());
                } catch (error) {
                    console.error("Erro ao buscar a máquina:", error);
                }
            };

            fetchMaquina();
        }
    }, [id]);


    const salvarMaquina = async () => {
        if (maquina) {
            // Se a máquina já existe, atualizar
            console.log("TEste" + maquina.createdAt);
            await database.write(async () => {
                await maquina.update((m) => {
                    m.nome = nome;
                    m.vida_util = Number.parseInt(vida_util);
                    //m.created_at = new Date();
                });
            });
            console.log("Máquina atualizada com sucesso!");
        } else {
            // Se não existe, criar uma nova
            await database.write(async () => {
                await maquinasCollection.create((novaMaquina) => {
                    novaMaquina.nome = nome;
                    novaMaquina.vida_util = Number.parseInt(vida_util);
                });
            });
            console.log("Máquina criada com sucesso!");
        }
        setNome('');
        setVida_util('');


        const maquinas = await maquinasCollection.query().fetch();
        //exibir maquina criada


        console.log(maquinas);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo="Adicionar Máquina"></Titulo>

            {
                camposMaquina.map((campo, index) => (
                    <Input key={index} label={campo.label} placeholder={campo.placeholder} />
                ))
            }
            
            {/* <TextInput
                placeholder="Nome"
                onChangeText={setNome}
                value={nome}
            />

            <TextInput
                placeholder="Vida útil"
                onChangeText={setVida_util}
                value={vida_util}
                keyboardType="numeric"
            /> */}

            <Botao nome="Salvar" rota="/maquinas" />

            {/* <Button title="Salvar" onPress={salvarMaquina} /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1, 
    },
})