import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request Camera Permission</Text>
        </TouchableOpacity>
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

    // use the object form so the value matches the router's typed overloads
    router.push({
      pathname: '/result',
      params: {
        photoUri: encodeURIComponent(photo.uri),
      }
    });
  };

  return (
    <View className="flex-1">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
      <TouchableOpacity
        onPress={takePicture}
        className="absolute bottom-10 self-center bg-white p-4 rounded-full"
      >
        <Text>Snap</Text>
      </TouchableOpacity>
      <Button title="Close Camera" onPress={() => router.push('/')} />
    </View>
  );
}

