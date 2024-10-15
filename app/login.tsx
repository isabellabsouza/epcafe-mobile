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


import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput, Button } from 'react-native'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import Titulo from '@/components/Titulo'
import Input from '@/components/Input'
import Botao from '@/components/Botao'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

function handleLogin(){
            //login logic
    router.replace('/selecionarUnidade');
}

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
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
      <Botao nome="Entrar" onPress={handleLogin} />
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