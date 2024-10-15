// import { View, Text, StyleSheet, Button } from "react-native";
// import {Link, router} from 'expo-router';
// import ButtonLink from "@/components/ButtonLink";
// import Input from "@/components/Input";

// export default function Login() {

//     function handleLogin(){
//         //... login logic
//         router.replace('/restricted');
//     }

//     return (
//         <View style={styles.container}>
//             <Text> Digite as informações para entrar no aplicativo!</Text>
//             <Input placeholder="Digite seu email" />
//             <Input placeholder="Digite sua senha" />
//             <Button onPress={handleLogin} title="Entrar" />
//             {/* <ButtonLink route="/restricted" title="Entrar" /> */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// })


import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput, Button } from 'react-native'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import Titulo from '@/components/Titulo'
import Input from '@/components/Input'
import Botao from '@/components/Botao'
import { Session } from '@supabase/supabase-js'



function handleLogin(){
            //login logic
    router.replace('/selecionarUnidade');
}

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessao, setSessao] = useState<Session | null>(null)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSessao(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSessao(session)
    })
  }, [])

  if (sessao && sessao.user) {
    router.replace("/selecionarUnidade")
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
      {/* <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={handleLogin} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View> */}
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