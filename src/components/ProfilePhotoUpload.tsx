import React, { useState } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const ProfilePhotoUpload = ({ onImagePicked }: { onImagePicked: (uri: string) => void }) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission required", "You need to grant permission to pick an image.");
            return;
        }

        const result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if ('uri' in result) {
            setImageUri(result.uri);
            onImagePicked(result.uri);
        } else {
            Alert.alert("Error", "Failed to select an image.");
        }
    };

    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission required", "You need to grant permission to use the camera.");
            return;
        }

        const result: any = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if ('uri' in result) {
            setImageUri(result.uri);
            onImagePicked(result.uri);
        } else {
            Alert.alert("Error", "Failed to take a photo.");
        }
    };

    return (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            {imageUri ? (
                <Image
                    source={{ uri: imageUri }}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        borderWidth: 4,
                        borderColor: '#fff',
                        marginBottom: 10,
                    }}
                />
            ) : (
                <View
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        borderWidth: 4,
                        borderColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}
                >
                    <MaterialIcons name="camera-alt" size={40} color="#ccc" />
                </View>
            )}
            <Pressable
                onPress={handleImagePick}
                style={{
                    backgroundColor: '#007AFF',
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 10,
                }}
            >
                <Text style={{ color: '#fff' }}>Choose Photo</Text>
            </Pressable>
            <Pressable
                onPress={handleTakePhoto}
                style={{
                    backgroundColor: '#FF9500',
                    padding: 10,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: '#fff' }}>Take Photo</Text>
            </Pressable>
        </View>
    );
};

export default ProfilePhotoUpload;
