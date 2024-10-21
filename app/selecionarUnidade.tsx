import Subtitulo from "@/components/Subtitulo";
import Titulo from "@/components/Titulo";
import { unidadesCollection, usuariosCollection } from "@/db";
import Unidade from "@/db/model/Unidade";
import { supabase } from "@/lib/supabase";
import { Q } from "@nozbe/watermelondb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SelecionarUnidade() {
    const [unidades, setUnidades] = useState<Unidade[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [tenantId, setTenantId] = useState<string>();
    
    const buscarUsuarioLogado = useCallback(async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                const usuario = await usuariosCollection.find(user.id);
                setTenantId(usuario.tenant.id);
            }
        } catch (error) {
            console.error("Erro ao buscar usuário logado:", error);
        }
    }, []);

    useEffect(() => {
        buscarUsuarioLogado();
    }, [buscarUsuarioLogado]);

    useEffect(() => {
        async function buscarUnidades() {
            if (tenantId) {
                try {
                    const unidadesEncontradas = await unidadesCollection
                        .query(Q.where("tenant_id", tenantId))
                        .fetch();
                    setUnidades(unidadesEncontradas);
                } catch (error) {
                    console.error("Erro ao buscar as unidades: ", error);
                }
            }
        }
        buscarUnidades();
    }, [tenantId]);

    function escolherUnidade(unidade: Unidade) {
        try {
            AsyncStorage.multiSet([
                ["unidadeId", unidade.id],
                ["unidadeNome", unidade.nome],
                ["tenantId", tenantId || ""],
                ["userId", userId || ""]
            ]);
            console.log(`Unidade selecionada: ${unidade.nome}, Tenant ID: ${tenantId}, User ID: ${userId}`);
            router.push("/restricted");
        } catch (error) {
            console.error("Erro ao salvar unidade e tenantId:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Titulo titulo="Seja bem vindo!" />
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
        padding: 20,
        paddingTop: 50,
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
