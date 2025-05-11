import { supabase } from './supabase';

export const createCheckoutSession = async (priceId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('Please login to subscribe');
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId: user.id,
      }),
    });

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};