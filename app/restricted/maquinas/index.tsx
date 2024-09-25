import ButtonLink from '@/components/ButtonLink';
import { Text, View } from 'react-native';

import CardLista from '@/components/CardLista';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, Stack } from 'expo-router';

export default function Maquinas() {
    
    function goBack(){
        router.replace('/restricted');
    }

    return (
        <View>
            <Stack.Screen options={{headerLeft: () => {
                return <AntDesign name="arrowleft" size={24} color="black" onPress={goBack} />
            },
            title: "\t\t\t\tMaquinas",
            }} />
            <Text>Maquinas</Text>
            
            <ButtonLink route="/restricted/maquinas/criar" title="Nova Máquina" />
            
            <CardLista />
        </View>
    );
}

// const EnhancedMaquinas = withObservables([], () => ({
//     maquinas: maquinasCollection.query(),
// }));

// export default EnhancedMaquinas(Maquinas);
//https://www.youtube.com/watch?v=x7KE4JD-Q9A&t=7479s 2:15:58 JSI SQLite Adapter erro