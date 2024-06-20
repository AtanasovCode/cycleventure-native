import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wmtemevsxdmmliqtsitp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtdGVtZXZzeGRtbWxpcXRzaXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MDU0MDcsImV4cCI6MjAzMzA4MTQwN30.eBB2c2ajceviu9lZBJjdYBfGXwuBjxAm-q0Su2Wpgvc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})