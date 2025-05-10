import React, { useState } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const ProfilePhotoUpload = ({ onImagePicked }: { onImagePicked: (uri: string) => void }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleImagePick = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission Required", "We need access to your photo library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            onImagePicked(uri);
        }
    };

    const handleTakePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission Required", "We need access to your camera.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            onImagePicked(uri);
        }
    };

    return (
        <View className="items-center space-y-4">
            <View className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md overflow-hidden">
                {imageUri ? (
                    <Image source={{ uri: imageUri }} className="w-full h-full" />
                ) : (
                    <View className="flex-1 justify-center items-center bg-gray-100">
                        <MaterialIcons name="camera-alt" size={40} color="#9ca3af" />
                    </View>
                )}
            </View>

            <View className="flex-row space-x-4">
                <Pressable
                    onPress={handleImagePick}
                    className="flex-row items-center px-4 py-2 rounded-full bg-primary shadow"
                >
                    <MaterialIcons name="photo-library" size={20} color="#fff" />
                    <Text className="ml-2 text-white font-medium">Choose Photo</Text>
                </Pressable>

                <Pressable
                    onPress={handleTakePhoto}
                    className="flex-row items-center px-4 py-2 rounded-full bg-accent shadow"
                >
                    <MaterialIcons name="photo-camera" size={20} color="#fff" />
                    <Text className="ml-2 text-white font-medium">Take Photo</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ProfilePhotoUpload;
