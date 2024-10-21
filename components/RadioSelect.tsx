import { useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

interface RadioSelectProps {
    label: string;
    dados: RadioButtonProps[];
}
export default function RadioSelect({label, dados}: RadioSelectProps) {

    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
        <>
        <Text style={styles.label}>{label}</Text>
        <RadioGroup 
            radioButtons={dados} 
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={styles.radioContainer}
        />
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        marginTop: 15
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        marginVertical: 20
    }
})