import {View, Text, TouchableOpacity} from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { maquinasCollection } from '@/db';
import Maquina from '@/db/model/Maquina';
import ButtonLink from '@/components/ButtonLink';


export default function detalharMaquina() {
    const { id } = useLocalSearchParams();

    const [maquina, setMaquina] = useState<Maquina>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica se o ID está presente antes de buscar
        if (id) {
            const fetchMaquina = async () => {
                try {
                    const maquina = await maquinasCollection.find(String(id)); // Certifique-se de que o 'id' é uma string
                    setMaquina(maquina);
                } catch (error) {
                    console.error("Erro ao buscar a máquina:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMaquina();
        }
    }, [id]);

    if (!maquina) {
        return <Text>Máquina não encontrada.</Text>;
    }

    return (
        <View>
            <Text>Detalhar Máquina</Text>
            <Link href={{ pathname: "/restricted/maquinas/criar", params: {id: maquina.id}}} asChild>
                <TouchableOpacity>
                    <Text>Editar</Text>
                </TouchableOpacity>
            </Link>
            {/* <ButtonLink route="/restricted/maquinas/criar" title="Editar" /> */}
            <Text>Nome: {maquina.nome}</Text>
            <Text>Vida Útil: {maquina.vida_util} anos</Text>
        </View>
    );
}