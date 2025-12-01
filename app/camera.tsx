import { persistImage } from '@/utils/image';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Button, Pressable, Text, View } from 'react-native';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Pressable onPress={requestPermission}>
          <Text>Request Camera Permission</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
      skipProcessing: false, // iOS image quality enhancer
    });

    console.log("Photo:", photo);
    const copiedImageUri = await persistImage(photo.uri);
    // TODO resize image

    router.push({
      pathname: '/classify',
      params: {
        photoUri: encodeURIComponent(copiedImageUri as string),
      }
    });
  };

  return (
    <View className="flex-1">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
      <Pressable
        onPress={takePicture}
        className="absolute bottom-10 self-center bg-white p-4 rounded-full"
      >
        <Text>Snap</Text>
      </Pressable>
      <Button title="Close Camera" onPress={() => router.push('/')} />
    </View>
  );
}

