import Stripe from 'npm:stripe@12.0.0';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
    try {
        const { priceId, userId } = await request.json();

        if (!priceId || !userId) {
            return new Response('Missing required parameters', { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.EXPO_PUBLIC_APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.EXPO_PUBLIC_APP_URL}/subscription/cancel`,
            client_reference_id: userId,
        });

        return Response.json({ sessionUrl: session.url });
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        return new Response(error.message, { status: 400 });
    }
}