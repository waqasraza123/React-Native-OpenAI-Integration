import { supabase } from "../lib/supabase";

export const createCheckoutSession = async (priceId: string) => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (sessionError || userError || !session || !user) {
      throw new Error('Please login to subscribe');
    }

    const token = session.access_token;
    const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

    const { data, error } = await supabase.functions.invoke('create-stripe-checkout-session-url', {
      body: { name: 'Functions', priceId: "price_1PruFOERPGugMFaujyJ4f51Z", quantity: 1 },
    })

    if (!data && !data.url) {
      throw new Error('Failed to create Stripe session');
    }

    return data.url;
  } catch (error: any) {
    throw new Error(error.message || 'Unexpected error occurred');
  }
};
