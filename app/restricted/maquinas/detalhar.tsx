import {View, Text, TouchableOpacity} from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import database, { maquinasCollection } from '@/db';
import Maquina from '@/db/model/Maquina';
import ButtonLink from '@/components/ButtonLink';
import { withObservables } from '@nozbe/watermelondb/react';
import Entypo from '@expo/vector-icons/Entypo';


export default function detalharMaquina() {

    const { id } = useLocalSearchParams();
    console.log("ID da máquina: ", id);

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

    const excluir = async () => {
        await database.write(async () => {
            await maquina.markAsDeleted();
        })
    };

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
            <Entypo name="trash" size={24} color="black" onPress={excluir}/>
        </View>
    );
}

// const enhance = withObservables(['id'], ({ id }) => {

//     if (!id) {
//         throw new Error('ID da máquina está undefined');
//     }
//     return {

//         maquina: maquinasCollection.findAndObserve(id), // Observa a máquina específica com o ID
//     };
// });

// export default enhance(detalharMaquina);