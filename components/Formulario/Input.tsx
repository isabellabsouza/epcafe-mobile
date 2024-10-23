import { TextInput, Text, StyleSheet, KeyboardTypeOptions } from "react-native";

interface InputProps {
    label: string,
    placeholder: string,
    value: string;  // Valor atual do campo
    onChangeText: (text: string) => void;
    onPress?: () => void;
    keyboard?: KeyboardTypeOptions,
    showKeyboard?: boolean,
    secureTextEntry?: boolean
}
export default function Input({
        label, 
        placeholder, 
        value, 
        onChangeText, 
        onPress, 
        keyboard='default', 
        showKeyboard=true,
        secureTextEntry=false
    }: InputProps) {

    return (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.campoInput}
                onPress={onPress}
                keyboardType={keyboard}
                showSoftInputOnFocus={showKeyboard}
                autoComplete="off"
                secureTextEntry={secureTextEntry}
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