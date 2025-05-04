import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://oimqgyahxvuezjrkxyxe.supabase.co'
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pbXFneWFoeHZ1ZXpqcmt4eXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNjA4MTcsImV4cCI6MjA2MTkzNjgxN30.t3DiIk_HNZHodxtVeh835kMLutctEncJilPqdWsEzZc'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase URL or Anon Key. Check your environment variables.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
