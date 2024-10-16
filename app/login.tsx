import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput, Button } from 'react-native'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import Titulo from '@/components/Titulo'
import Input from '@/components/Input'
import Botao from '@/components/Botao'
import { Session } from '@supabase/supabase-js'
import { firstSync } from '@/db/firstSync'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [sessao, setSessao] = useState<Session | null>(null)

    // async function signInWithEmail() {
    //     setLoading(true)
    //     const { error } = await supabase.auth.signInWithPassword({
    //         email: email,
    //         password: password,
    //     })

    //     if (error) Alert.alert(error.message)
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     supabase.auth.getSession().then(({ data: { session } }) => {
    //         setSessao(session)
    //     })

    //     const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    //         setSessao(session)
    //     })

    //     return () => {
    //         authListener.subscription.unsubscribe(); // Limpar listener ao desmontar
    //     };
    // }, [])

    // useEffect(() => {
    //     if (sessao && sessao.user) {
    //       router.replace('/selecionarUnidade');
    //     }
    // }, [sessao]);

    async function signInWithEmail() {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        
        if (error) {
            Alert.alert('Erro', error.message);
            return;
        }
        setLoading(false);

        // if (session?.user) {
        //     setSessao(session);
        //     await fetchUsuario(session.user.id); // Continua apenas se a sessão for válida
        //     router.replace('/selecionarUnidade');
        // } else {
        //     Alert.alert('Erro', 'Sessão não encontrada, tente novamente.');
        // }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSessao(session)
        })

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSessao(session)
        })

        return () => {
            authListener.subscription.unsubscribe(); // Limpar listener ao desmontar
        };
    }, [])

    useEffect(() => {
        if (sessao && sessao.user) {
          router.replace('/selecionarUnidade');
        }
    }, [sessao]);

    async function fetchUsuario(userId: string) {
        const { data, error } = await supabase
            .from('usuario')
            .select('tenant_id')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Erro ao buscar usuário:', error);
            Alert.alert('Erro ao sincronizar dados');
            return;
        }

        // Executa a primeira sincronização com o tenant_id obtido
        await firstSync(data.tenant_id);
    }


    return (
        <View style={styles.container}>
            <Titulo titulo="Entre na sua conta" />

            <Input
                label='Email'
                placeholder='Digite seu email'
                value={email}
                onChangeText={setEmail}
            />

            <Input
                label='Senha'
                placeholder='Digite sua senha'
                value={password}
                onChangeText={setPassword}
            />

            <Botao nome="Entrar" disabled={loading} onPress={() => signInWithEmail()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //marginTop: 40,
        padding: 17,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})