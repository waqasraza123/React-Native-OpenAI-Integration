export interface SubscriptionFeature {
    id: string;
    name: string;
    description: string;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    interval: 'month' | 'year';
    features: SubscriptionFeature[];
    priceId: string; // Stripe Price ID
}

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: 'basic',
        name: 'Basic Plan',
        price: 10,
        interval: 'month',
        priceId: 'price_basic_monthly',
        features: [
            {
                id: 'feature-1',
                name: 'Unlimited Access',
                description: 'Access to all basic features'
            },
            {
                id: 'feature-2',
                name: 'Priority Support',
                description: '24/7 email support'
            },
            {
                id: 'feature-3',
                name: 'Basic Analytics',
                description: 'Track your basic metrics'
            }
        ]
    },
    {
        id: 'pro',
        name: 'Pro Plan',
        price: 20,
        interval: 'month',
        priceId: 'price_pro_monthly',
        features: [
            {
                id: 'feature-4',
                name: 'Advanced Features',
                description: 'Access to all pro features'
            },
            {
                id: 'feature-5',
                name: 'Dedicated Support',
                description: '24/7 priority phone & email support'
            },
            {
                id: 'feature-6',
                name: 'Advanced Analytics',
                description: 'Detailed metrics and insights'
            }
        ]
    }
];