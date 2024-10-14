import { TextInput, Text, StyleSheet } from "react-native";

interface InputProps {
    label: string,
    placeholder: string
}
export default function Input({label, placeholder}: InputProps) {
    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                placeholder={placeholder}
                style={styles.campoInput}
            />
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        marginTop: 15
    },
    campoInput: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 17,
        marginTop: 6,
        marginBottom: 15,
        fontSize: 15
    }
})