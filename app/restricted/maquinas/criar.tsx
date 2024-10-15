import Botao from "@/components/Botao";
import Input from "@/components/Input";
import Titulo from "@/components/Titulo";
import Toast from "@/components/Toast/Toast";
import { useToast } from "@/components/Toast/ToastProvider";
import database, { maquinasCollection } from "@/db";
import Maquina from "@/db/model/Maquina";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, ToastAndroid } from "react-native";

export default function CriarMaquina() {
    const { id } = useLocalSearchParams();
    const [nome, setNome] = useState('');
    const [vida_util, setVida_util] = useState('');
    const [maquina, setMaquina] = useState<Maquina>();
    const titulo = id ? "Editar Máquina" : "Adicionar Máquina";
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    const camposMaquina = [
        {
            label: 'Nome',
            placeholder: 'Informe o nome da máquina',
            value: nome,
            onChangeText: setNome
        },
        {
            label: 'Vida Útil',
            placeholder: 'Informe a vida útil em anos',
            value: vida_util,
            onChangeText: setVida_util
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

            await database.write(async () => {
                await maquina.update((m) => {
                    m.nome = nome;
                    m.vida_util = Number.parseInt(vida_util);

                });
            });
            setGravidade('sucesso');
            setMensagem('Máquina atualizada com sucesso!');    
            setToast(true);
            setTimeout(() => {router.back()}, 3000);
            
            console.log("Máquina atualizada com sucesso!");
        } else if (nome && vida_util) {

            await database.write(async () => {
                await maquinasCollection.create((novaMaquina) => {
                    novaMaquina.nome = nome;
                    novaMaquina.vida_util = Number.parseInt(vida_util);
                });
            });

            setGravidade('sucesso');
            setMensagem('Máquina criada com sucesso!');    
            setToast(true);

            console.log("Máquina criada com sucesso!");
        } else {
            
            setGravidade('erro');
            setMensagem('Não foi possível salvar a máquina!');    
            setToast(true);
            //showToast();
            console.log("Preencha todos os campos!");

        }
        setNome('');
        setVida_util('');


        const maquinas = await maquinasCollection.query().fetch();
        //exibir maquina criada


        console.log(maquinas);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo={titulo}></Titulo>

            {
                camposMaquina.map((campo, index) => (
                    <Input
                        key={index}
                        label={campo.label}
                        placeholder={campo.placeholder}
                        value={campo.value}
                        onChangeText={campo.onChangeText}
                    />
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

            <Botao nome="Salvar" onPress={salvarMaquina} />

            {/* <Button onPress={() => {setToast(true)}} title="Show Toast" /> */}

            {toast && 
                <Toast setToast={ setToast } 
                    mensagem={mensagem} 
                    gravidade={gravidade} 
                />
            }
            

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 17,
        flexGrow: 1,
    },
})