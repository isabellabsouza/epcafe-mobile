import SyncButton from "@/components/navigation/SyncButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function DespesaFertilizanteLayout() {
    const [nomeUnidade, setNomeUnidade] = useState<string | null>(null);

    useEffect(() => {
        const fetchNomeUnidade = async () => {
            try {
                const unidadeNome = await AsyncStorage.getItem("unidadeNome");
                setNomeUnidade(unidadeNome);
            } catch (error) {
                console.error("Erro ao buscar o nome da unidade:", error);
            }
        };
        fetchNomeUnidade();
    }, []);
    
    return (

        <Stack screenOptions={{
            headerShown:true,
            headerRight: () => <SyncButton />,
            title: nomeUnidade || "",
            }} >
            
        </Stack>
    )
}
