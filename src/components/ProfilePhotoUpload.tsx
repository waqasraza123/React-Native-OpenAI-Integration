import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    Image,
    Alert,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProfilePhotoUploadProps {
    onImagePicked: (uri: string) => void;
    currentImage?: string;
}

const ProfilePhotoUpload = ({ onImagePicked, currentImage }: ProfilePhotoUploadProps) => {
    const [imageUri, setImageUri] = useState<string | null>(currentImage || null);
    const { showActionSheetWithOptions } = useActionSheet();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleWebFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const uri = URL.createObjectURL(file);
            setImageUri(uri);
            onImagePicked(uri);
        }
    };

    const openPicker = async () => {
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

    const openCamera = async () => {
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

    const handlePhotoAction = () => {
        if (Platform.OS === 'web') {
            fileInputRef.current?.click();
        } else {
            const options = ['Take Photo', 'Choose from Library', 'Cancel'];
            const cancelButtonIndex = 2;

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                (selectedIndex?: number) => {
                    switch (selectedIndex) {
                        case 0:
                            openCamera();
                            break;
                        case 1:
                            openPicker();
                            break;
                        default:
                            break;
                    }
                }
            );
        }
    };

    return (
        <View className="items-center">
            <Pressable
                onPress={handlePhotoAction}
                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-md overflow-hidden bg-gray-100"
            >
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="flex-1 justify-center items-center">
                        <Ionicons name="camera-outline" size={40} color="#9ca3af" />
                        <Text className="text-sm text-gray-400 mt-2">Tap to upload</Text>
                    </View>
                )}
            </Pressable>

            {Platform.OS === 'web' && (
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleWebFileChange}
                />
            )}
        </View>
    );
};

export default ProfilePhotoUpload;
