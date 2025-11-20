import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, View } from 'react-native';

interface CameraProps {
  onClose: () => void;
}

export default function Camera({ onClose }: CameraProps) {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} />
      <Button title="Close Camera" onPress={onClose} />
    </View>
  );
}