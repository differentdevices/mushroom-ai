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
      // TODO: need to style this better
      <View className="flex-1 items-center justify-center">
        <Pressable
          className="bg-blue-600 p-4 rounded-xl flex-1"
          onPress={requestPermission}
        >
          <Ionicons name="camera" size={32} />
          <Text className="text-white text-lg text-center">Grant Camera Permission</Text>
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

