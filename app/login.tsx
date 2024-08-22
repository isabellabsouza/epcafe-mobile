import { View, Text, StyleSheet } from "react-native";
import {Link} from 'expo-router';
import ButtonLink from "@/components/ButtonLink";
import Input from "@/components/Input";

export default function Login() {
    return (
        <View style={styles.container}>
            <Text> Digite as informações para entrar no aplicativo!</Text>
            <Input placeholder="Digite seu email" />
            <Input placeholder="Digite sua senha" />
            <ButtonLink route="/restricted" title="Entrar" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})