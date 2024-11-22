import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

const supabaseUrl = 'https://nbqumagfqchmsnfryqil.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5icXVtYWdmcWNobXNuZnJ5cWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3NDQwNTMsImV4cCI6MjAzOTMyMDA1M30.4vIqEtq9hgRGTGr5j1scdDMPQjhBl7GkDJ9pLZf3JlI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

AppState.addEventListener('change', (state) => {
  if (state ==='active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})