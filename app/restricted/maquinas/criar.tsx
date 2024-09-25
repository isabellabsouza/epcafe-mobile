import Input from "@/components/Input";
import database , {maquinasCollection} from "@/db";
import { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Link, useLocalSearchParams } from 'expo-router';
import Maquina from "@/db/model/Maquina";

export default function CriarMaquina() {
    const { id } = useLocalSearchParams();
    const [nome, setNome] = useState('');
    const [vida_util, setVida_util] = useState('');
    const [maquina, setMaquina] = useState<Maquina>();
    
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
            await database.write(async () => {
                await maquina.update((m) => {
                    m.nome = nome;
                    m.vida_util = Number.parseInt(vida_util);
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

        console.log("Máquina salva com sucesso!");
        const maquinas = await maquinasCollection.query().fetch();
        console.log(maquinas);
    }

    return (
        <View>
            <Text>Adicionar Máquina</Text>

            {/* <Input placeholder="Nome" />

            <Input placeholder="Vida útil" /> */}

            <TextInput
                placeholder="Nome"
                onChangeText={setNome}
                value={nome}
            />

            <TextInput
                placeholder="Vida útil"
                onChangeText={setVida_util}
                value={vida_util}
                keyboardType="numeric"
            />

            <Button title="Salvar" onPress={salvarMaquina}/>
        </View>
    );
}