import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, Text, View } from "react-native";

interface SelectProps {
    dados: Array<{ label: string, value: string }>,
    onChange: (value: any) => void,
    value: string,
    placeholder: string,
    label: string
}
export default function Select({ dados, onChange, value, placeholder, label }: SelectProps) {
    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <Dropdown data={dados}
                labelField="label"
                valueField="value"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={styles.select}
                containerStyle={styles.dropdownContainer}
            />
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        marginTop: 15
    },
    select: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 17,
        marginTop: 6,
        marginBottom: 15,
        fontSize: 15
    },
    dropdownContainer: {
        backgroundColor: '#ebe9e9',
        borderRadius: 20,

    },
    
})