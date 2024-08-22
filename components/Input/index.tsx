import { TextInput, StyleSheet } from "react-native";

interface InputProps {
    placeholder: string;
}
const Input: React.FC<InputProps> = ({placeholder}) => {
    return (
        <TextInput 
            style={styles.input}
            placeholder={placeholder}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
})

export default Input;