import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { PlanCard } from '../../components/subscription/PlanCard';
import { subscriptionPlans } from '../../types/subscription';
import { useSubscription } from '../../hooks/useSubscription';
import Icon from 'react-native-vector-icons/Feather';

export default function SubscriptionScreen() {
    const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0].id);
    const { loading, handleSubscribe } = useSubscription();

    const handleUpgrade = async () => {
        const plan = subscriptionPlans.find(p => p.id === selectedPlan);
        if (plan) {
            await handleSubscribe(plan.priceId);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source="https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg"
                    style={styles.headerImage}
                    contentFit="cover"
                />
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Upgrade Your Experience</Text>
                    <Text style={styles.subtitle}>
                        Choose the perfect plan for your needs
                    </Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.featuredBadge}>
                    <Icon name="zap" size={16} color="#6366F1" />
                    <Text style={styles.featuredText}>Limited Time Offer</Text>
                </View>

                {subscriptionPlans.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        isSelected={selectedPlan === plan.id}
                        onSelect={() => setSelectedPlan(plan.id)}
                    />
                ))}

                <View style={styles.upgradeContainer}>
                    <View style={styles.guaranteeContainer}>
                        <Icon name="check" size={20} color="#22C55E" />
                        <Text style={styles.guaranteeText}>30-day money-back guarantee</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        {loading ? (
                            <ActivityIndicator color="#6366F1" />
                        ) : (
                            <View style={styles.upgradeButton}>
                                <Text style={styles.upgradeButtonText} onPress={handleUpgrade}>
                                    Upgrade Now
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.featuresGrid}>
                    <Text style={styles.featuresTitle}>All Plans Include</Text>
                    <View style={styles.featuresList}>
                        {[
                            'Unlimited conversations',
                            'Priority support',
                            'Advanced AI features',
                            'Custom integrations',
                            'Analytics dashboard',
                            'Team collaboration',
                        ].map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Icon name="check" size={16} color="#22C55E" />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        height: 240,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    content: {
        padding: 24,
        paddingTop: 32,
    },
    featuredBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    featuredText: {
        color: '#6366F1',
        fontWeight: '600',
        marginLeft: 6,
    },
    upgradeContainer: {
        marginTop: 32,
        marginBottom: 48,
    },
    guaranteeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    guaranteeText: {
        marginLeft: 8,
        color: '#374151',
        fontSize: 14,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    upgradeButton: {
        backgroundColor: '#6366F1',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        ...Platform.select({
            ios: {
                shadowColor: '#6366F1',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
            web: {
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            },
        }),
    },
    upgradeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    featuresGrid: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
            web: {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
        }),
    },
    featuresTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    featuresList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 16,
    },
    featureText: {
        marginLeft: 8,
        color: '#374151',
        fontSize: 14,
    },
});
