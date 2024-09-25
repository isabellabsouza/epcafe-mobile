import { View, Text, StyleSheet, Button } from "react-native";
import {Link, router} from 'expo-router';
import ButtonLink from "@/components/ButtonLink";
import Input from "@/components/Input";

export default function Login() {

    function handleLogin(){
        //... login logic
        router.replace('/restricted');
    }

    return (
        <View style={styles.container}>
            <Text> Digite as informações para entrar no aplicativo!</Text>
            <Input placeholder="Digite seu email" />
            <Input placeholder="Digite sua senha" />
            <Button onPress={handleLogin} title="Entrar" />
            {/* <ButtonLink route="/restricted" title="Entrar" /> */}
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