import { persistImage } from '@/utils/image';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        {/* Icon Container */}
        <View className="mb-8 p-6 bg-blue-50 rounded-full">
          <Ionicons name="camera" size={56} color="#2563eb" />
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
          Camera Access Required
        </Text>

        {/* Description */}
        <Text className="text-gray-600 text-center mb-8 leading-6">
          We need access to your camera to identify and classify mushrooms. Your photos are processed securely.
        </Text>

        {/* Button */}
        <Pressable
          className="w-full bg-blue-600 active:bg-blue-700 py-4 rounded-xl mb-4"
          onPress={requestPermission}
        >
          <Text className="text-white text-lg font-semibold text-center">Grant Camera Permissions</Text>
        </Pressable>

        {/* Cancel Button */}
        <Pressable
          className="w-full py-3 border border-gray-300 rounded-xl"
          onPress={() => router.push('/')}
        >
          <Text className="text-gray-700 text-center font-medium">Cancel</Text>
        </Pressable>
      </View>
    );
  }

  const pickFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // TODO: refactor deprecated options
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      console.log('[INFO] Picked from library:', result.assets[0].uri);

      const copiedImageUri = await persistImage(result.assets[0].uri);
      router.push({
        pathname: '/classify',
        params: {
          photoUri: encodeURIComponent(copiedImageUri as string),
        }
      });
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;

    // Take picture
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
      skipProcessing: false, // iOS image quality enhancer
    });
    console.log('[INFO] Taken picture:', photo);

    // Make a copy into persistent storage
    const copiedImageUri = await persistImage(photo.uri);
    console.log('[INFO] Copied picture:', copiedImageUri);

    router.push({
      pathname: '/classify',
      params: {
        photoUri: encodeURIComponent(copiedImageUri as string),
      }
    });
  };

  function closeCamera() {
    router.push('/');
  }

  return (
    <View className="flex-1">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      {/* Bottom Overlay */}
      <View className="absolute bottom-10 left-0 right-0 flex-row justify-around items-center px-6">
        {/* Gallery Button */}
        <Pressable className="p-3 active:opacity-60" onPress={pickFromLibrary}>
          <Ionicons name="images-outline" size={32} color="white" />
        </Pressable>

        {/* Capture Button */}
        <Pressable className="p-2 active:opacity-60" onPress={takePicture}>
          <View className="w-[70px] h-[70px] rounded-full border-2 border-white flex items-center justify-center">
            <View className="w-[60px] h-[60px] rounded-full bg-white" />
          </View>
        </Pressable>

        {/* Close Button */}
        <Pressable className="p-3 active:opacity-60" onPress={closeCamera}>
          <Ionicons name="close" size={36} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

