import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Button, View } from 'react-native';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
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
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Close Camera" onPress={() => router.push('/')} />
    </View>
  );
}

