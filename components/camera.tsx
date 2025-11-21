import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, View } from 'react-native';

interface CameraProps {
  onClose: () => void;
}

export default function Camera({ onClose }: CameraProps) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

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
    setPhotoUri(photo.uri);
  };

  return (
    <View style={{ flex: 1 }}>
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={{ flex: 1 }}
          resizeMode="cover"
        />
      ) : (
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
      )}
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Close Camera" onPress={onClose} />
    </View>
  );
}