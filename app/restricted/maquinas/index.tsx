import database, {maquinasCollection} from '@/db';
import {View, Text, Button } from 'react-native';
export default function Maquinas() {

    const onRead = async () => {

        await database.write(async () => {
            await maquinasCollection.create((maquina) => {
                maquina.nome = "Maquina 4";  
                maquina.vida_util= 10;  
            });
        });
        console.log("Maquinas criadas");

        const maquinas = await maquinasCollection.query().fetch();
        console.log(maquinas);
    }

    return (
        <View>
            <Text>Maquinas</Text>
            
            <Button title="Ver maquinas" onPress={onRead} />
        </View>
    );
}