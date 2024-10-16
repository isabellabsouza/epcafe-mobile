import Botao from "@/components/Botao";
import FormFactory from "@/components/FormFactory/FormFactory";
import MontaObject from "@/components/FormFactory/MontaObject";
import Input from "@/components/Input";
import Titulo from "@/components/Titulo";
import Toast from "@/components/Toast/Toast";
import database, { getTenant, maquinasCollection } from "@/db";
import Maquina from "@/db/model/Maquina";
import Tenant from "@/db/model/Tenant";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function CriarMaquina() {
    const montaObject = new MontaObject();

    const { id } = useLocalSearchParams();
    
    const [maquina, setMaquina] = useState<Maquina>();
    const titulo = id ? "Editar Máquina" : "Adicionar Máquina ou Implemento";
    const [toast, setToast] = useState(false);
    const [gravidade, setGravidade] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tenant, setTenant] = useState<Tenant>();
    let values = montaObject;

    //edição de máquinas e implementos
    useEffect(() => {
        if (id) {
            //se for passado um id, buscar a máquina para edição
            const fetchMaquina = async () => {
                try {
                    const maquinaEncontrada = await maquinasCollection.find(String(id)); 
                    setMaquina(maquinaEncontrada);

                    //TODO: setar os valores dos inputs
                    
                } catch (error) {
                    console.error("Erro ao buscar a máquina:", error);
                }
            };

            fetchMaquina();
        }
    }, [id]);

    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const fetchedTenant = await getTenant;
                setTenant(fetchedTenant);
                console.log("Tenant:", fetchedTenant.tenant);
            } catch (error) {
                console.error("Erro ao buscar o tenant:", error);
            }
        };
        fetchTenant();
    }, []);


    //salvar máquina ou implemento
    const salvarMaquina = async () => {
        if (maquina) {
            
            // Se a máquina já existe, atualizar
            await database.write(async () => {
                await maquina.update((m) => {
                    m.nome = values.getValue('nome');
                    m.consumoMedio = values.getValue('consumoMedio');
                    m.dataCompra = values.getValue('dataCompra');
                    m.modelo = values.getValue('modelo');
                    m.potencia = values.getValue('potencia');
                    m.tipo = values.getValue('tipo');
                    m.tipoCalculo = values.getValue('tipoCalculo');
                    m.tipoCombustivel = values.getValue('tipoCombustivel');
                    m.tipoInsumo = values.getValue('tipoInsumo');
                    m.valor = values.getValue('valor');
                    m.vidaUtil = values.getValue('vidaUtil');
                    //TODO: pegar tenantId do usuário logado supabase.auth
                    
                });
            });

            //exibir mensagem de sucesso
            setGravidade('sucesso');
            setMensagem('Máquina atualizada com sucesso!');
            setToast(true);
            // setTimeout(() => { router.back() }, 3000);

            console.log("Máquina" + maquina.nome + " atualizada com sucesso!");
        } else{
            setTenant(await getTenant);
            await database.write(async () => {
                await maquinasCollection.create((novaMaquina) => {
                    novaMaquina.nome = values.getValue('nome');
                    novaMaquina.consumoMedio = values.getValue('consumoMedio');
                    novaMaquina.dataCompra = values.getValue('dataCompra');
                    novaMaquina.modelo = values.getValue('modelo');
                    novaMaquina.potencia = values.getValue('potencia');
                    novaMaquina.tipo = values.getValue('tipo');
                    novaMaquina.tipoCalculo = values.getValue('tipoCalculo');
                    novaMaquina.tipoCombustivel = values.getValue('tipoCombustivel');
                    novaMaquina.tipoInsumo = values.getValue('tipoInsumo');
                    novaMaquina.valor = values.getValue('valor');
                    novaMaquina.vidaUtil = values.getValue('vidaUtil');
                    //novaMaquina.tenant.set(tenant);
                    
                });
            }).then(() => {

                setGravidade('sucesso');
                setMensagem('Máquina criada com sucesso!');
                setToast(true);
    
                console.log("Máquina criada com sucesso!");
            }).catch((error) => {
                setGravidade('erro');
                setMensagem('Erro ao criar máquina');
                setToast(true);
                console.error("Erro ao criar máquina:", error);
            });

        }

        const maquinas = await maquinasCollection.query().fetch();
        console.log(maquinas);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent} >
            <Titulo titulo={titulo}></Titulo>

            {
                FormFactory.createForm(maquinasCollection, montaObject)
            }

            <Botao nome="Salvar" onPress={salvarMaquina} disabled={false} />

            {toast &&
                <Toast setToast={setToast}
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